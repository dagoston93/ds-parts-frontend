import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { CircularProgress, IconButton } from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import useParts from "../hooks/useParts";

const PartTable = () => {
    const { parts, isLoading } = useParts();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Part</TableCell>
                        <TableCell align="right">Manufacturer</TableCell>
                        <TableCell align="right">Package</TableCell>
                        <TableCell align="right">Package type</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right" sx={{ paddingRight: 0 }}>
                            Count
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={8} align="center">
                                <CircularProgress size="3rem" />
                            </TableCell>
                        </TableRow>
                    )}
                    {parts.map((part) => (
                        <TableRow
                            key={part._id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {part.name}
                            </TableCell>
                            <TableCell align="right">
                                {part.manufacturer?.name || "Unknown"}
                            </TableCell>
                            <TableCell align="right">
                                {part.partPackage?.name || "Unknown"}
                            </TableCell>
                            <TableCell align="right">
                                {part.partPackage?.type || "Unknown"}
                            </TableCell>
                            <TableCell align="right">
                                ${part.price.toFixed(2)}
                            </TableCell>
                            <TableCell align="right" sx={{ paddingRight: 0 }}>
                                {part.count}
                            </TableCell>
                            <TableCell align="left" sx={{ paddingLeft: 0 }}>
                                <Stack spacing={0}>
                                    <IconButton
                                        aria-label="increase count"
                                        color="primary"
                                        sx={{ paddingBottom: 0 }}
                                    >
                                        <FaCaretUp />
                                    </IconButton>
                                    <IconButton
                                        aria-label="decrease count"
                                        color="primary"
                                        sx={{ paddingTop: 0 }}
                                    >
                                        <FaCaretDown />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="edit" color="primary">
                                    <MdEdit />
                                </IconButton>
                                <IconButton aria-label="delete" color="error">
                                    <MdDelete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PartTable;
