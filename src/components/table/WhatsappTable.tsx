"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import Icons from "../Icons";
import Image from "next/image";
import { toast } from "../ui/Toast";

interface VerificationsTableProps {
    params: {
        id: string;
    };
}

const VerificationsTable: FC<VerificationsTableProps> = ({ params }) => {
    const { data: contactQuery, isLoading } = useQuery({
        queryKey: ["userId", params.id],
        queryFn: async () => {
            let { data } = await axios.get(
                `http://localhost:3000/api/contact`,
                {
                    params: { verified: "false" },
                }
            );
            return data;
        },
    });

    const deleteUser: React.MouseEventHandler<HTMLButtonElement> = async (
        id
    ) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/`, {
                params: { id: id },
            });

            return toast({
                title: "Success",
                message: "Data Send",
                type: "success",
            });
        } catch (error) {
            toast({
                title: "Something wrong",
                message: "Error",
                type: "error",
            });
            console.log(error);
        }
    };
    return (
        <>
            <table className="min-w-max w-full table-fixed mt-5">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-5 text-center mx-auto ">Nama</th>
                        <th className="py-3 px-5 text-center mx-auto">
                            No Whatsapp
                        </th>
                        <th className="py-3 px-5 text-center max-w-md mx-auto">
                            Keterangan
                        </th>
                        <th className="py-3 px-5 text-center mx-auto ">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 h-auto text-sm font-light">
                    {contactQuery?.data?.map((list: any) => (
                        <tr
                            key={list.id}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-5 w-30">
                                <span>{list.name}</span>
                            </td>
                            <td className="py-3 px-5 text-center ">
                                <span>{list.waNumber}</span>
                            </td>
                            <td className="py-3 px-5 text-center ">
                                <span>{list.location}</span>
                            </td>
                            <td className=" py-3 px-5 justify-center items-center gap-5 text-center">
                                <button
                                    type="button"
                                    name="edit"
                                    className="bg-blue-600 text-white hover:bg-blue-500 object-center px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-3 ease-linear"
                                >
                                    <Icons.Edit className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    name="delete"
                                    onClick={() => deleteUser(list.id)}
                                    className="bg-red-600 text-white hover:bg-red-500 object-center p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear"
                                >
                                    <Icons.X className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default VerificationsTable;
