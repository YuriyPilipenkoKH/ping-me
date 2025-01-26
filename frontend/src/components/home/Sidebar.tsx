import React, { useEffect } from 'react'
import { useChatStore } from '../../store/useChatStore'
import SidebarSkeleton from '../skeletons/SidebarSkeleton'

const Sidebar = () => {
 const {
    getUsers,
    users,
    selectedUser, 
    setSelectedUser, 
    isUsersLoading
    } = useChatStore()
    const onlineUsers =[]

    useEffect(() => {
      getUsers();
    }, [getUsers]);
  
    // const filteredUsers = showOnlineOnly
    //   ? users.filter((user) => onlineUsers.includes(user._id))
    //   : users;
  
    if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar