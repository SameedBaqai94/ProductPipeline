interface ButtonInterface {
    title: string;
}
export default function Button(props: ButtonInterface) {
    return (
        <button>{props.title}</button>
    )
}