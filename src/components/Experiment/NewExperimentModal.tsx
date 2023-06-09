import React from "react";
import NewModal from "../NewModal";

interface NewExperimentModalProps {
  isModalOpen: boolean;
  handleToggleModal: () => void;
  setIsCreateNew: (isCreateNew: boolean) => void;
}

const NewExperimentModal = ({
  isModalOpen,
  handleToggleModal,
  setIsCreateNew,
}: NewExperimentModalProps) => {
  const createExperiment = async (name: string, description?: string) => {
    handleToggleModal();
    try {
      await fetch(`/api/experiments`, {
        method: "POST",
        body: JSON.stringify({ name: name, description: description }),
      });
    } catch (error) {
      console.log(error);
    }
    setIsCreateNew(true);
  };
  return (
    <NewModal
      isModalOpen={isModalOpen}
      handleToggleModal={handleToggleModal}
      handleCreate={createExperiment}
      modalTitle={"Add a New Experiment"}
    />
  );
};

export default NewExperimentModal;
