import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../../components/Navbar";
import { BriefcaseIcon, CogIcon, HomeIcon,ShieldIcon } from "lucide-react";
import { ClassValue } from "clsx";
import AdminPage from "../AdminPage/AdminPage";
import AccountInfo from "../../components/Account/AccountInfo";
import AccountOrders from "../../components/Account/AccountOrders";
import AccountSettings from "../../components/Account/AccountSettings";

interface UserData {
  id: string;
  userName: string;
  name: string;
  surName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  avatar: string;
}



function classNames(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AccountPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('profile');


  const [navigation, setNavigation] = useState([
  { name: 'Мой профиль', key: 'profile', icon: HomeIcon },
  { name: 'Заказы пользователя', key: 'orders', icon: BriefcaseIcon },
  { name: 'Настройки', key: 'settings', icon: CogIcon },
]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Accounts/GetUserData`, {
          withCredentials: true,
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    if (userData && userData.userName === 'Admin') {
        const dashboardExists = navigation.some(item => item.key === 'dashboard');
        if (!dashboardExists) {
            setNavigation([
                ...navigation,
                { name: 'Панель управления', key: 'dashboard', icon: ShieldIcon }
            ]);
        }
    }
}, [userData]);


  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <AccountInfo/>
        );
      case 'orders':
        return (
            <AccountOrders/>
        );
      case 'dashboard':
        return(
              <AdminPage/>
        )
      case 'settings':
        return (
            <AccountSettings/>
        );
      default:
        return null;
    }
  };

  return (
      <>
        <Navbar/>
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <nav className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-gray-50 pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4 h-8"></div>
            <div className="mt-5 flex-grow">
              <div className="space-y-1">
                {navigation.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => setActiveTab(item.key)}
                        className={classNames(
                            activeTab === item.key
                                ? 'bg-purple-50 border-purple-600 text-purple-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                            'group border-l-4 py-2 px-3 flex items-center text-sm font-medium w-full text-left'
                        )}
                    >
                      <item.icon
                          className={classNames(
                              activeTab === item.key ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-3 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                      />
                      {item.name}
                    </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
        <div className="p-4 sm:ml-64 pt-24">
          {renderContent()}
        </div>
      </>
  );
}
