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
<<<<<<< HEAD
        setIsLoading(true);
=======
        // setIsLoading(true);
>>>>>>> 8bb988241466d87e8bfed0942d94c1adced58245
        try {
            const data = await axios.post(
                "http://localhost:3000/api/whatsapp",
                formValue
            );
            console.log("Post Send: ", data);
<<<<<<< HEAD
            setIsLoading(false);
=======
>>>>>>> 8bb988241466d87e8bfed0942d94c1adced58245
            return toast({
                title: "Success",
                message: "Data Send",
                type: "success",
            });
        } catch (error) {
<<<<<<< HEAD
            setIsLoading(false);
=======
>>>>>>> 8bb988241466d87e8bfed0942d94c1adced58245
            toast({
                title: "Something wrong",
                message: "Error",
                type: "error",
            });
            console.log(error);
        }
<<<<<<< HEAD
=======
        // setIsLoading(false);
>>>>>>> 8bb988241466d87e8bfed0942d94c1adced58245
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
<<<<<<< HEAD
                    isLoading={isLoading}
                >
                    <span>Send Message</span>
                </Button>
=======
                    // isLoading={isLoading}
                >
                    <span>Send Message</span>
                </Button>
                {/* <div className="relative text-white">{JSON.stringify(data)}</div> */}
>>>>>>> 8bb988241466d87e8bfed0942d94c1adced58245
            </form>
        </div>
    );
};

export default MessageForm;
function preventDefault() {
    throw new Error("Function not implemented.");
}
