import { useLocation } from "react-router-dom"
import styled from "styled-components";

const Progress = () => {
  const {pathname} = useLocation();
  const paths = ['/','/yhteystiedot','/maksu'];
  return(
    <div>
      {paths.map(path => (
        <Ball selected={pathname===path} key={path}/>
      ))}
    </div>
  )
}

const Ball = styled.span<{selected: boolean}>`
  display: inline-block;
  color: ${props => props.theme.neutral};
  height: 8px;
  width: 8px;
  border: 1px solid ${props => props.theme.neutral};
  background-color: ${props => props.selected ? props.theme.neutral : 'none'};
  border-radius: 5px;
  margin: 8px;
`;

export default Progress;