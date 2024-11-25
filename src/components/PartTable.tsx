import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

interface Part {
    _id: string;
    name: string;
    manufacturer: {
        name: string;
    };
    partPackage: {
        name: string;
        type: "SMD" | "THT";
    };
    price: number;
    count: number;
    category: {
        name: string;
    };
}

const PartTable = () => {
    const parts: Part[] = [
        {
            _id: "1",
            name: "Resistor - 47 Ohm",
            manufacturer: { name: "Unknown" },
            partPackage: { name: "1206", type: "SMD" },
            price: 0.02,
            count: 23,
            category: { name: "Resistors" },
        },

        {
            _id: "2",
            name: "Resistor - 10 kOhm",
            manufacturer: { name: "Unknown" },
            partPackage: { name: "1206", type: "SMD" },
            price: 0.03,
            count: 17,
            category: { name: "Resistors" },
        },

        {
            _id: "3",
            name: "Capacitor - 22 pF",
            manufacturer: { name: "Unknown" },
            partPackage: { name: "1206", type: "SMD" },
            price: 0.01,
            count: 62,
            category: { name: "Capacitors" },
        },

        {
            _id: "4",
            name: "Capacitor - 10 uF",
            manufacturer: { name: "Unknown" },
            partPackage: { name: "Through hole", type: "THT" },
            price: 0.02,
            count: 159,
            category: { name: "Resistors" },
        },
    ];

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
                                {part.manufacturer.name}
                            </TableCell>
                            <TableCell align="right">
                                {part.partPackage.name}
                            </TableCell>
                            <TableCell align="right">
                                {part.partPackage.type}
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
