import { useNavigate } from 'react-router-dom';

export function withRouter( Child ) {
  return ( props ) => {
    const navigate = useNavigate();
    return <Child { ...props } navigate={navigate} />;
  }
}