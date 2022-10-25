import { Button } from "react-bootstrap";

export const PrimaryButton = props => {
  return(
    <Button variant="primary" href={props.href} type="submit">{props.text}</Button>
  );
};