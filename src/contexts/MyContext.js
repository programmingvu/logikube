import React, { createContext,Component } from "react";
import axios from 'axios'
import UserProfile from '../components/UserProfile';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const MyContext = createContext();


// Define the base URL
const Axios = axios.create({
    baseURL: '/var/api',
});

class MyContextProvider extends Component{
    constructor(){
        super();
        this.isLoggedIn();
    }

    // Root State
    state = {
        showLogin:true,
        isAuth:false,
        theUser:null,
        vendorName:[],
        vendorNumber:[],
        partNumber:[],
        containerNumber:[],
        parts:[],
        partData:[],
        audit:[],
        users:[],
    }
    
    // Toggle between Login & Signup page
    toggleNav = () => {
        const showLogin = !this.state.showLogin;
        this.setState({
            ...this.state,
            showLogin
        })
    }

    // On Click the Log out button
    logoutUser = () => {
        localStorage.removeItem('loginToken');
        this.setState({
            ...this.state,
            isAuth:false
        })
        window.location.href = "/";
        // return <Login/>;
    }

    registerUser = async (user) => {

        // Sending the user registration request
        const register = await Axios.post('register.php',{
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            password:user.password,
            company:user.company,
            location:user.location
        });

        return register.data;
    }

    getPart = async (partNumber) => {
        const part = await Axios.post('part-api.php', {
            value:'part'
        });

        return part.data;
    }

    partSearch = async (value) => {
       
        const part = await Axios.post('part-api.php', {
            value:'part_search',
            vendor: value.vendor_name,
            vendor_number: value.vendor_number,
            part_number: value.part_number,
            container_number: value.container_number
        });

        this.setState({
            ...this.state,
            partData:part.data,
            
        });
        
    }



    getVendor = async () => {
        const vendor = await Axios.post('part-api.php',{
            value:'vendor'
        });
        // console.log(vendor);
        this.setState({
            ...this.state,
            vendorName:vendor.data

        });
        
        
        // return vendor.data;
        // const {data} = await Axios.post('part-api.php',{
        // this.setState({
        //     ...this.state,
        //     partSearch:data
        // });
        // let result = data.map(({ vendor }) => vendor);
        // console.log(result);
    }

    getVendorNumber = async () => {
        const vendorNumber = await Axios.post('part-api.php', {
            value:'vendor_number'
        });
        // console.log(vendorNumber);
        this.setState({
            ...this.state,
            vendorNumber:vendorNumber.data
        });
    }

    getPartNumber = async() => {
        const partNumber = await Axios.post('part-api.php', {
            value:'part_number'
        });
        this.setState({
            ...this.state,
            partNumber:partNumber.data
        });
    }

    getContainerNumber = async() => {
        const containerNumber = await Axios.post('part-api.php', {
            value:'container_number'
        });
        this.setState({
            ...this.state,
            containerNumber:containerNumber.data
        });
    }

    getParts = async(user) => {
        const parts = await Axios.post('part-api.php', {
            value:'parts'
        });
        this.setState({
            ...this.state,
            parts:parts.data,
            theUser:user
        });
    }

    getUsers = async() => {
        const users = await Axios.post('part-api.php', {
            value:'users'
        });
        this.setState({
            ...this.state,
            users:users.data
        });
    }


    loginUser = async (user) => {
        UserProfile.setName(user.email);
        // Sending the user Login request
        const login = await Axios.post('login.php',{
            email:user.email,
            password:user.password
        });
        return login.data;
    }

    updatePart = async (parts) => {
        
        const part = await Axios.post('part-api.php', {
            value:'update',
            vendorName: parts.vendorName,
            vendorNumber: parts.vendorNumber,
            partNumber: parts.partNumber,
            partDescription: parts.partDescription,
            weight: parts.weight,
            weightUOM: parts.weightUOM,
            quantity: parts.quantity,
            reusable: parts.reusable,
            containerType: parts.containerType,
            containerNumber: parts.containerNumber,
            length: parts.length,
            width: parts.width,
            height: parts.height,
            containerUOM: parts.containerUOM,
            stackable: parts.stackable,
            active: parts.active,
            user: cookies.get('full_name')

        });
        

        return part.data;
    }

    updateUser = async (user) => {

        const data = await Axios.post('part-api.php', {
            value: 'update_user',
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            active: user.active,
            admin:user.admin,
        });

        return data.data;
    }

    addPart = async (part) => {
        const data = await Axios.post('part-api.php', {
            value:'add_part',
            vendorName: part.vendorName,
            vendorNumber: part.vendorNumber,
            partNumber: part.partNumber,
            partDescription: part.partDescription,
            weight: part.weight,
            weightUOM: part.weightUOM,
            quantity: part.quantity,
            reusable: part.reusable,
            containerType: part.containerType,
            containerNumber: part.containerNumber,
            length: part.length,
            width: part.width,
            height: part.height,
            containerUOM: part.containerUOM,
            stackable: part.stackable,
            active: part.active,
            user: cookies.get('full_name')
        });

        return data.data;
    }

    getAudit = async (part) => {
        const audit = await Axios.post('part-api.php', {
            value:'audit',
            partNumber: part
        });
        this.setState({
            ...this.state,
            audit:audit.data,
        });
    }

    setActive = async(parts) => {
        const active = await Axios.post('part-api.php', {
            value:'active',
            parts: parts

        });

        return active.data;
    }
    // Checking user logged in or not
    isLoggedIn = async () => {
        const loginToken = localStorage.getItem('loginToken');

        // If inside the local-storage has the JWT token
        if(loginToken){

            //Adding JWT token to axios default header
            Axios.defaults.headers.common['Authorization'] = 'bearer '+loginToken;

            // Fetching the user information
            const {data} = await Axios.get('user-info.php');

            // If user information is successfully received
            if(data.success && data.user){
                this.setState({
                    ...this.state,
                    isAuth:true,
                    theUser:data.user
                });
            }

        }
    }

    render(){
        
        const contextValue = {
            rootState:this.state,
            toggleNav:this.toggleNav,
            isLoggedIn:this.isLoggedIn,
            registerUser:this.registerUser,
            updatePart:this.updatePart,
            updateUser:this.updateUser,
            addPart:this.addPart,
            getPart:this.getPart,
            getVendor:this.getVendor,
            getVendorNumber:this.getVendorNumber,
            getPartNumber:this.getPartNumber,
            getContainerNumber:this.getContainerNumber,
            getParts:this.getParts,
            getUsers:this.getUsers,
            getAudit:this.getAudit,
            partSearch:this.partSearch,
            loginUser:this.loginUser,
            logoutUser:this.logoutUser
        }
        return(
            <MyContext.Provider value={contextValue}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

export default MyContextProvider;