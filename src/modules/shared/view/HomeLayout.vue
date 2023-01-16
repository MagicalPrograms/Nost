<template>
    <div >
      <!-- <NavbarComponent /> -->
      <div class="d-flex">
        <div id="contentside" class="side-content">
          <Sidebar />
        </div>
        <div class="col content-body">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script>  
  import Sidebar from '../components/Sidebar.vue'
  
  export default {
    name: 'HomeLayout',

    components: {
      Sidebar
    },
  }
  </script>
  
  <style>
    body {
      background-color: var(--bg-color);
      /* color: var(--tx-color); */
    }
  
    h3, h2,
    .sub-titles {
      padding: 10px 0px;
      color: var(--txt-color-title);
    }
  
    .sub-titles {
      cursor: pointer;
      padding: 20px 0px !important;
    }
  
    .sub-titles:hover::before {
        content: "#";
        color: var(--bg-color-secundary);
        font-size: 1rem;
        font-weight: 500;
        position: relative;
        transition: linear .5s;
    }
    
    h3::before{
        content: "";
        position: relative;
        border: 4px solid var(--bg-color-secundary);
        margin-right: 5px;
        border-radius: 5px;
    }
  
    #contentside.open{
      width: 220px;
      transition: linear .3s;
    }
  
    #contentside{
      width: 60px;
      transition: linear .3s;
    }
  
    .content-body {
      padding: .5rem 1rem;
      overflow-y: scroll;
    }
  
    .mn {
      padding: 0;
      margin: 0;
    }
  
    .mn-i {
      padding: 0 !important;
      margin: 0 !important;
    }
    
  </style>