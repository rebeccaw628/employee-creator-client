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
    <div className="text-red">
      <h1>Dashboard</h1>
      <p>Employment Basis Summary:</p>
      <div className="">
        {employmentBasis.map((stat) => (
          <StatsCard
            key={stat.type}
            bold={stat.count}
            content={stat.type.replace("_", " ")}
          />
        ))}
      </div>
      <p>Contract Type Summary:</p>
      {contractType.map((stat) => (
        <StatsCard
          key={stat.type}
          bold={stat.count}
          content={stat.type.replace("_", " ")}
        />
      ))}
      <p onClick={openInfoModal} className="cursor-pointer ">
        Employees finishing this month:
      </p>
      <StatsCard bold={endingThisMonth.length} content="Employees" />
      <Button
        variants={
          "h-10 w-fit cursor-pointer hover:shadow-lg hover:bg-brand-purple-500 hover:text-white py-2 px-3 border rounded-lg"
        }
        onClick={openInfoModal}
      >
        SEE DETAILS
      </Button>
      {showModal && (
        <Modal
          heading={"Employee Details"}
          onClose={closeInfoModal}
          variants={"bg-black/90 py-8"}
        >
          {endingThisMonth.map((employee) => (
            <div className="flex justify-between w-2/12">
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
