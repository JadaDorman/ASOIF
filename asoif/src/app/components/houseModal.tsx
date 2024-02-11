import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { houseCrests } from "../helpers/houseCrests";
import Image from "next/image";
import {
  Modal,
  Table,
    Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
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
        className="flex justify-center items-center min-w-96 scroll-smooth"
        id="house-modal"
        open={isModalOpen}
        onClose={handleCloseModal}
      >
           <div>
            <div  className="flex justify-center Z-40 fill  self-center">
        <Image
         
          src={
            houseCrests.find(
              (crest: { name: string }) => crest.name === houseName
            )?.imagePath || '/placeholderCrest.png'
          }
          alt={houseName}
          width={70}
          height={70}
        />
        </div>
        
        <Card  variant="outlined" sx={{ width: '100%', maxHeight: 600, overflow: 'auto' }}>
      
          <CardContent>
            
            <div className="grid grid-cols-2 gap-4 px-2 py-4">
            <div >
            <h1 className="font-serif text-4xl ">{houseName}</h1>
            <p className=" text-sm">Sworn Members</p>
            </div>
            <div className="flex justify-end">
            <CardActions>
            <IconButton
             aria-label="close"
             className="m-1q"
              id="close-modal"
             size="large"
            >
              <CloseIcon onClick={handleCloseModal} />
            </IconButton>
          </CardActions>
            </div>
            </div>
            <TableContainer className="px-4">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Members</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Died</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      {swornMembers !== undefined && swornMembers.length > 0 ? (
                        swornMembers.map(
                          (member: { name: string, died: string } | undefined, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{member?.name}</TableCell>
                              <TableCell> {member?.died ? "Dead" : "Alive"}</TableCell>
                              <TableCell>{member?.died}</TableCell>
                            </TableRow>
                          )
                        )
                      ) : (
                        <li>This house has no members</li>
                      )}
                    </TableBody>
            </Table>
            </TableContainer>
          </CardContent>
         
        </Card>
        </div>
      </Modal>
  );
}

export default HouseModal;
