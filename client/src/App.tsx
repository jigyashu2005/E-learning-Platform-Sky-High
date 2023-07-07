import React,{useEffect} from "react";
import StudentHeader from "./components/partials/StudentHeader";
import "react-toastify/dist/ReactToastify.css";
import { Outlet} from "react-router-dom";
import AdminLoginPage from "./components/pages/admin/AdminLoginPage";
import { Sidenav } from "./components/admin/widgets/layout";
import { routes } from "./components/pages/admin/AdminDashBoardPage";
import { useSelector } from "react-redux";
import InstructorSideNav from "./components/partials/SideNav";
import { selectIsAdminLoggedIn } from "./redux/reducers/adminAuthSlice";
import InstructorHeader from "./components/partials/InstructorHeader";
import useIsOnline from "./hooks/useOnline";
import YouAreOffline from "./components/common/YouAreOffline";
import StudentFooter from "./components/partials/StudentFooter";
import { selectIsLoggedIn } from "./redux/reducers/authSlice";
import usePreventBackButton from "./hooks/usePrevent";


export const Student: React.FC = () => {
  const isOnline = useIsOnline();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isHeaderVisible = true
  // usePreventBackButton(isLoggedIn);
  const headerClassName = `bg-gray-100 ${
    isHeaderVisible ? 'opacity-100 transition-opacity duration-500 ' : 'opacity-0 '
  }`;
  return (
    <>
      {isOnline ? (
          <div className="bg-white">
            <div className={`${headerClassName}`}>
            <StudentHeader />
            </div>
            <Outlet />
            <StudentFooter />
          </div>
        ): (
        <YouAreOffline />
      )}
    </>
  );
};

export const Instructor: React.FC = () => {
  const isOnline = useIsOnline();
  return (
    <>
      {isOnline ? (
        <>
          <div className='fixed inset-x-0 top-0 flex flex-col '>
            <InstructorHeader />
            <div className='flex flex-1'>
              <div className='w-64 h-screen overflow-y-auto'>
                <InstructorSideNav />
              </div>
              <div className='flex flex-col flex-1'>
                <div className='p-4 bg-customBlueShade overflow-y-scroll h-screen'>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <YouAreOffline />
      )}
    </>
  );
};

export const Admin: React.FC = () => {
  const isAdminLoggedIn = useSelector(selectIsAdminLoggedIn);
  const isOnline = useIsOnline();
  return (
    <>
      {isOnline ? (
        isAdminLoggedIn ? (
          <div className='bg-gray-100 flex'>
            <div className='w-80'>
              <Sidenav routes={routes} brandImg='/img/logo-ct-dark.png' />
            </div>
            <div className='flex-1'>
              <Outlet />
            </div>
          </div>
        ) : (
          <div className='bg-gray-100'>
            <AdminLoginPage />
          </div>
        )
      ) : (
        <YouAreOffline />
      )}
    </>
  );
};
