import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { houseCrests } from "../helpers/houseCrests";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Image from "next/image";
import {
  Modal,
  Table,
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
import  { tableCellClasses } from '@mui/material/TableCell';

interface HouseModalProps {
  houseName: string;
  swornMembers: [] | undefined;
  isModalOpen: boolean;
  handleCloseModal: () => void;
}


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export function HouseModal({
  houseName,
  swornMembers,
  isModalOpen,
  handleCloseModal,
}: HouseModalProps) {

  const handleLowerCase = (text: string) => {
    return text.charAt(0).toLowerCase() + text.slice(1);
  }
  return (
 
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <Modal
        className="flex justify-center items-center min-w-96 scroll-smooth animate-fade"
        id="house-modal"
        open={isModalOpen}
        onClose={handleCloseModal}
      >
           <div>
            <div  className="flex relative justify-center Z-40 fill  self-center top-8">
        <Image
          src={
            houseCrests.find(
              (crest: { name: string }) => crest.name === houseName
            )?.imagePath || '/placeholderCrest.png'
          }
          alt={houseName}
          width={70}
          height={50}
        />
        </div>
        <div className="border-2 border-yellow-300">
        <Card  variant="outlined" sx={{ height: 540,  maxHeight:540, minWidth: 750, }}>
      
          <CardContent >
            
            <div className="grid grid-cols-3 gap-2 px-2 pt-6">
            <div className="col-span-2">
            <h1 className="font-serif text-4xl ">{houseName}</h1>
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
  
            <TableContainer className="px-4" sx={{ maxHeight: 440 }}>
            <h2 className="font-medium text-xl text-yellow-300 py-2  ">Sworn Members</h2>
              <Table stickyHeader>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Members</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {swornMembers !== undefined && swornMembers.length > 0 ? (
                        swornMembers.map(
                          (member: { name: string, died: string } | undefined, index: number) => (
                            <StyledTableRow   key={index}>
                              <StyledTableCell >{member?.name}</StyledTableCell>
                              <StyledTableCell>{member?.died ? "Died " + handleLowerCase(member.died) : "Alive"}</StyledTableCell>
                            </StyledTableRow>
                          )
                        )
                      ) : (
                        <StyledTableRow>
                        <StyledTableCell>This house has no members.</StyledTableCell>
                        <StyledTableCell>{''}</StyledTableCell>
                        </StyledTableRow>
                  
                      )}
                    </TableBody>
            </Table>
            </TableContainer>
          </CardContent>
         
        </Card>
        </div>
        </div>
      </Modal>
      </ThemeProvider>
  );
}

export default HouseModal;
