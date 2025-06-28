import * as z from "zod";

export const schema = z
  .object({
    firstName: z.string().trim().min(2, "First name is required"),
    middleName: z.string().trim().optional(),
    lastName: z.string().trim().min(2, "Last name is required"),
    jobTitle: z.string().trim().min(3, "Job title is required"),
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
    contractType: z.enum(["Permanent", "Contract"], {
      errorMap: () => ({ message: "Invalid Contract Type" }),
    }),
    startDate: z.string(),
    endDate: z.string().nullable().optional(),
    employmentBasis: z.enum(["Full-time", "Part-time", "Casual"], {
      errorMap: () => ({ message: "Invalid Employment Basis" }),
    }),
    hoursPerWeek: z.string(),
  })
  .transform((data) => {
    if (data.employmentBasis === "Casual") {
      return {
        ...data,
        hoursPerWeek: "Casual",
      };
    }
    return data;
  });

export type EmployeeFormData = z.infer<typeof schema>;
