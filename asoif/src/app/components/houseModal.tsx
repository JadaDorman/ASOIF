import React from "react";
import { houseCrests } from "../helpers/houseCrests";
import Image from "next/image";
import {
  Modal,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

interface HouseModalProps {
  houseName: string;
  swornMembers: [] | undefined;
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

export function HouseModal({
  houseName,
  swornMembers,
  isModalOpen,
  handleCloseModal,
}: HouseModalProps) {
  return (
 
        
      <Modal
        className="flex justify-center items-center min-w-96"
        open={isModalOpen}
        onClose={handleCloseModal}
      >
           <div>
            <div  className="flex justify-center Z-40 fill  self-center">
        <Image
         
          src={
            houseCrests.find(
              (crest: { name: string }) => crest.name === houseName
            )?.imagePath
          }
          alt={houseName}
          width={70}
          height={70}
        />
        </div>
        <Card sx={{ minWidth: 700, height: 400 }}>
      
          <CardContent>
            <h1 className="font-serif text-4xl">{houseName}</h1>
            <Typography variant="body1">Sworn Members:</Typography>
            <ul>
              {swornMembers !== undefined && swornMembers.length > 0 ? (
                swornMembers.map(
                  (member: { name: string } | undefined, index: number) => (
                    <li key={index}>{member?.name}</li>
                  )
                )
              ) : (
                <li>This house has no members</li>
              )}
            </ul>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </CardActions>
        </Card>
        </div>
      </Modal>
  );
}

export default HouseModal;
