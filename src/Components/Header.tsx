import { Grid } from "antd";

type Props = {
    title: string;
}

const { useBreakpoint } = Grid;

const Header = ({title}: Props) => {
  const screens = useBreakpoint();

  return (
    <>
      {screens.sm 
        ? <h2 style={{ margin: ".5rem auto", fontSize: "1.6rem" }}>{title}</h2>
        : <h2 style={{ margin: "1rem auto" }}>{title}</h2>    
      }
    </>
  )
}

export default Header