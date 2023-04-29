"use client";

import Button from "@/ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/DropdownMenu";
import { toast } from "@/ui/Toast";
import { ThemeProvider, createTheme } from "@mui/material";
import { DataGrid, GridColumnHeaderParams, type GridColDef } from "@mui/x-data-grid";
import { User } from "@prisma/client";
import { useTheme } from "next-themes";
import { FC } from "react";
import Icons from "./Icons";

const columnsDraft: GridColDef[] = [
	{
		field: "col1",
		headerName: "Username",
		width: 240,
		renderHeader(params) {
			return <strong className="font-semibold">{params.colDef.headerName}</strong>;
		},
	},
	{ field: "col2", headerName: "Email", width: 400 },
	{ field: "col3", headerName: "Create At", width: 150 },
	{
		field: "col5",
		headerName: "Actions",
		width: 100,
		renderCell(params) {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="flex gap-2 items-center">
							<Icons.Settings />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={() => {
								toast({
									title: "Password Changed",
									message: "User Password Changed Successfully",
									type: "success",
								});
							}}>
							Change Password
						</DropdownMenuItem>

						<DropdownMenuItem
							onClick={() => {
								toast({
									title: "Edited",
									message: "User Data Edited Successfully",
									type: "success",
								});
							}}>
							Edit
						</DropdownMenuItem>

						<DropdownMenuItem
							onClick={() => {
								toast({
									title: "Deleted",
									message: "User Deleted Successfully",
									type: "success",
								});
							}}>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
const columns = columnsDraft.map((col) => {
	if (col.field === "col1") {
		return col;
	}

	return {
		...col,
		renderHeader(params: GridColumnHeaderParams<any, any, any>) {
			return <strong className="font-semibold">{params.colDef.headerName}</strong>;
		},
	};
});

type ModifiedRequestType<K extends keyof User> = Omit<User, K> & {
	createAt: string;
};

interface TableProps {
	userRequests: ModifiedRequestType<"createAt">[];
}

const Table: FC<TableProps> = ({ userRequests }) => {
	const { theme: applicationTheme } = useTheme();

	const theme = createTheme({
		palette: {
			mode: applicationTheme === "light" ? "light" : "dark",
		},
	});

	const rows = userRequests.map((request) => ({
		id: request.id,
		col1: request.name,
		col2: request.email,
		col3: `${request.createAt} ago`,
	}));

	return (
		<ThemeProvider theme={theme}>
			<DataGrid
				style={{
					backgroundColor: applicationTheme === "light" ? "white" : "#152238",
					fontSize: "1rem",
					width: "auto",
				}}
				pageSizeOptions={[5]}
				disableRowSelectionOnClick
				autoHeight
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5,
						},
					},
				}}
				columns={columns}
				rows={rows}
			/>
		</ThemeProvider>
	);
};

export default Table;
