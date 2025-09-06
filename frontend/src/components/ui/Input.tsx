interface InputInterface {
    type: "password" | "text" | "email";
    placeholder: string;
    name: string;
    change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, placeholder, name, change }: InputInterface) {
    return (
        <input type={type} placeholder={placeholder} name={name} onChange={change} />
    )
}