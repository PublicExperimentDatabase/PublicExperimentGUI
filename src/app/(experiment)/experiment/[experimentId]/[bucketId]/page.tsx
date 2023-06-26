"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import IterationTable from "@/components/Iteration/IterationTable";
import NewIterationModal from "@/components/Iteration/NewIterationModal";

interface PageProps {
  params: {
    experimentId: string;
    bucketId: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { experimentId, bucketId } = params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iterations, setIterations] = useState<IterationTableRow[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = () => {
    setIsDelete(!isDelete);
  };

  useEffect(() => {
    const fetchIteration = async () => {
      isCreateNew && setIsCreateNew(false);
      isDelete && setIsDelete(false);
      try {
        const response = await fetch(`/api/iteration/get`, {
          method: "POST",
          body: JSON.stringify({ experimentId: experimentId, bucketId: bucketId }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        const dbIterations = response.iterations;
        const transformedIterations = dbIterations.map((iteration: any) => {
          return {
            id: iteration._id,
            title: iteration.title,
            startTime: iteration.timestamp.startTime,
            stopTime: iteration.timestamp.stopTime,
          };
        }) as IterationTableRow[];

        setTitle(response.title);
        setDescription(response.description);
        setIterations(transformedIterations);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIteration();
  }, [isCreateNew, isDelete]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mx={4}>
      <Box width="100%" paddingX={10}>
        <Typography
          variant="h3"
          fontWeight="bold"
          fontSize="2xl"
          my={4}
          px={2}
          color="primary"
          textAlign="left"
        >
          {title}
        </Typography>
      </Box>
      <Box width="100%">
        <IterationTable
          experimentId={experimentId}
          bucketId={bucketId}
          rows={iterations}
          handleDelete={handleDelete}
          handleToggleModal={handleToggleModal}
        />
      </Box>

      {/* <NewIterationModal
        isModalOpen={isModalOpen}
        experimentTitle={title}
        bucketTitle={title}
        handleToggleModal={handleToggleModal}
        setIsCreateNew={setIsCreateNew}
      /> */}
    </Box>
  );
};

export default Page;