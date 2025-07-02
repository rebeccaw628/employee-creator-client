import * as z from "zod";

export const schema = z
  .object({
    firstName: z.string().trim().min(2, "First name is required"),
    middleName: z.string().trim().optional(),
    lastName: z.string().trim().min(2, "Last name is required"),
    position: z.string().trim().min(3, "Position is required"),
    email: z.string().trim().email({ message: "Invalid email address" }),
    mobile: z
      .string()
      .min(10, "Mobile number is required")
      .regex(
        /^04\d{8}$/,
        "Mobile number must be 10 digits with format: 04xxxxxxxx"
      ),
    address: z.string().min(3, "Street address is required"),
    city: z.string().min(3, "City is required"),
    state: z.enum(["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"], {
      errorMap: () => ({ message: "Invalid State" }),
    }),
    postcode: z.string().regex(/^\d{4}$/, "Invalid Postcode"),
    contractType: z.enum(["PERMANENT", "CONTRACT"], {
      errorMap: () => ({ message: "Invalid Contract Type" }),
    }),
    startDate: z.string(),
    endDate: z.string().nullable().optional(),
    employmentBasis: z.enum(["FULL TIME", "PART TIME", "CASUAL"], {
      errorMap: () => ({ message: "Invalid Employment Basis" }),
    }),
    hoursPerWeek: z.string(),
  })
  .refine((data) => data.endDate && data.endDate > data.startDate, {
    message: "End date must not be before start date",
    path: ["endDate"],
  })
  .refine(
    //Cross-field validation for hoursPerWeek, where employmentBasis = CASUAL
    (data) => {
      if (data.employmentBasis === "CASUAL") {
        return data.hoursPerWeek === "casual";
      }
      return true;
    },
    {
      message: "Must input 'casual' for casual employees",
      path: ["hoursPerWeek"],
    }
  )
  .refine(
    //Cross-field validation for hoursPerWeek, where employmentBasis = FULL TIME or PART TIME
    (data) => {
      if (
        data.employmentBasis === "FULL TIME" ||
        data.employmentBasis === "PART TIME"
      ) {
        return /^\d+(\.\d{1})?$/.test(data.hoursPerWeek);
      }
      return true;
    },
    {
      message: "Must input a number (1dp. max)",
      path: ["hoursPerWeek"],
    }
  )
  .refine(
    //Cross-field validation for endDate, where contractType = PERMANENT
    (data) => {
      if (data.contractType === "PERMANENT") {
        return data.endDate === null;
      }
      return true;
    },
    {
      message: "Permanent employees must not have an end date",
      path: ["endDate"],
    }
  );
// .transform((data) => {
//   if (data.employmentBasis === "CASUAL") {
//     return {
//       ...data,
//       hoursPerWeek: "Casual",
//     };
//   }
//   return data;
// });

export type EmployeeFormData = z.infer<typeof schema>;
