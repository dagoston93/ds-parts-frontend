import { useParams } from "react-router-dom";
import usePart from "../../hooks/parts/usePart";
import useNotifications from "../../hooks/useNotifications";
import { PageContainer } from "@toolpad/core";
import {
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import Gallery from "./Gallery";
import useCategories from "../../hooks/categories/useCategories";
import { getAllCustomFields } from "../../services/customFieldService";

const PartDetailView = () => {
    const { showError } = useNotifications();

    const params = useParams<{ id: string }>();
    const partId = params.id || "";

    const { data: part, error } = usePart(partId, showError);

    if (error) {
        throw new Error("Part with given id not found");
    }

    const { data: categories } = useCategories(showError);
    const customFields = getAllCustomFields(
        part?.category?._id || "",
        categories || []
    );

    return (
        <PageContainer title={part?.name}>
            <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Gallery part={part} />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left">
                                        Manufacturer
                                    </TableCell>
                                    <TableCell align="left">
                                        {part?.manufacturer?.name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Package</TableCell>
                                    <TableCell align="left">
                                        {part?.partPackage?.name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Package type
                                    </TableCell>
                                    <TableCell align="left">
                                        {part?.partPackage?.type}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Container
                                    </TableCell>
                                    <TableCell align="left">
                                        {part?.container?.name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Price</TableCell>
                                    <TableCell align="left">
                                        {part?.price.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Count</TableCell>
                                    <TableCell align="left">
                                        {part?.count}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
                <Typography variant="h5" gutterBottom>
                    Custom fields
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {Object.entries(part?.customFieldValues || {}).map(
                                ([id, customFieldValue]) => (
                                    <TableRow key={id}>
                                        <TableCell align="left">
                                            {
                                                customFields.find(
                                                    (cf) => cf.id === id
                                                )?.name
                                            }
                                        </TableCell>
                                        <TableCell align="left">
                                            {customFieldValue.stringValue ||
                                                customFieldValue.numericValue}{" "}
                                            {customFieldValue.unit}
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </PageContainer>
    );
};

export default PartDetailView;
