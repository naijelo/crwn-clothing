import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

import "./navigation.styles.scss";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());
  
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <div><CrwnLogo className="logo" /></div>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {
            currentUser ? (
              <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
              )
              : (<Link className="nav-link" to="/auth">
                  SIGN IN
                </Link>
                )
          }
          <CartIcon/>
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;