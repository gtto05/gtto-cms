import { useNavigate,useParams,useLocation } from 'react-router-dom';

export function withRouter( Child ) {
  return ( props ) => {
    const navigate = useNavigate();
    const params = useParams()
    const location = useLocation()
    return <Child { ...props } navigate={navigate} params={params} location={location }/>;
  }
}