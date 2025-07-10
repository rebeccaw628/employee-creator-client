import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard/StatsCard";
import {
  type EmployeeStats,
  getEmployeeStats,
} from "../services/employees-services";
import Modal from "../components/Modal/Modal";
import Button from "../components/Button/Button";

const DashboardPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<EmployeeStats>({
    employmentBasis: [],
    contractType: [],
    endingThisMonth: [],
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getEmployeeStats()
      .then((data) => {
        setStats(data);
      })
      .catch((e) => console.warn(e))
      .finally(() => setLoading(false));
  }, []);

  const { employmentBasis, contractType, endingThisMonth } = stats;

  if (loading) return <div>Loading employee stats...</div>;

  const openInfoModal = () => {
    setShowModal(true);
  };

  const closeInfoModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-4/5 px-4 flex flex-col gap-4">
      <h1 className="justify-self-start text-2xl">Dashboard</h1>
      <div className="flex flex-col gap-4">
        <p className="text-left text-xl">Employment Basis Summary:</p>
        <div className="flex gap-6">
          {employmentBasis.map((stat) => (
            <StatsCard
              key={stat.type}
              bold={stat.count}
              content={stat.type.replace("_", " ")}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-left text-xl">Contract Type Summary:</p>
        <div className="flex gap-6">
          {contractType.map((stat) => (
            <StatsCard
              key={stat.type}
              bold={stat.count}
              content={stat.type.replace("_", " ")}
            />
          ))}
        </div>
      </div>

      <p className="text-left text-xl">Employees finishing this month:</p>
      <StatsCard bold={endingThisMonth.length} content="Employees">
        <Button
          variants={
            "h-10 w-fit cursor-pointer hover:shadow-lg hover:bg-brand-purple-500 hover:text-white py-2 px-3 border rounded-lg"
          }
          onClick={openInfoModal}
        >
          SEE DETAILS
        </Button>
      </StatsCard>

      {showModal && (
        <Modal
          heading={"Employee Details"}
          onClose={closeInfoModal}
          variants={"bg-black/90 py-8"}
          innerVariants="w-[25%]"
        >
          {endingThisMonth.map((employee) => (
            <div key={employee.id} className="flex justify-between">
              <p>{employee.name}</p>
              <p className="text-gray-600">{`ID: ${employee.id}`}</p>
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
