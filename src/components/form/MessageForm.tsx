"use client";

import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import axios from "axios";
import React, { FC } from "react";

interface MessageFormProps {}

const MessageForm: FC<MessageFormProps> = ({}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [formValue, setformValue] = React.useState([
        {
            hp: "6281345222156",
            pesan: "Zahwa this is a early warning test message from Flood-EWS",
        },
        {
            hp: "62895346793826",
            pesan: "Zahwa this is a early warning test message from Flood-EWS 2",
        },
    ]);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await axios.post(
                "http://localhost:3000/api/whatsapp",
                formValue
            );
            console.log("Post Send: ", data);
            setIsLoading(false);
            toast({
                title: "Success",
                message: "Message Sent",
                type: "success",
            });
        } catch (error) {
            setIsLoading(false);
            toast({
                title: "Something wrong",
                message: "Error",
                type: "error",
            });
            console.log(error);
        }
    };

    // const handleChange = (event: { target: { name: any; value: any } }) => {
    //     setformValue({
    //         ...formValue,
    //         [event.target.name]: event.target.value,
    //     });
    // };

    return (
        <div className="px-8 py-6">
            <form action="" method="post">
                <Button
                    className="items-end justify-center mt-6"
                    variant={"green"}
                    onClick={onSubmit}
                    isLoading={isLoading}
                >
                    <span>Send Message</span>
                </Button>
            </form>
        </div>
    );
};

export default MessageForm;
function preventDefault() {
    throw new Error("Function not implemented.");
}
