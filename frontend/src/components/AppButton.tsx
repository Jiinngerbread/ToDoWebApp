import { FC } from 'react'


interface ButtonProps {
    buttonName: string;
    buttonColor?: "danger"| "normal" | "regular";
    onClick?(): void;
}

const AppButton: FC<ButtonProps> = ({buttonName, buttonColor, onClick}) => {
    let color = ""

    switch(buttonColor) {
        case "danger":
            color = "bg-red-500"
            break
        case "normal":
            color = "bg-gray-500"
            break
        case "regular":
            color = "bg-blue-500"
            break
    }

    return (
        <button className={color + " text-white px-5 py-2 rounded"} onClick={onClick}>{buttonName}</button>
    )
}

export default AppButton