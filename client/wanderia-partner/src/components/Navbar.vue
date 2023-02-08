<script>
export default {
  name: "Navbar",
};
</script>

<template>
    <header
      id="header"
      class="d-flex align-items-center bg-[#000] align-items-center"
    >
      <div class="container d-flex justify-content-between">
        <div id="logo">
          <a href="/">
            <img src="../assets/wanderia.png" class="mx-auto d-block " alt="Wanderia" width="100"/>
          </a>
        </div>

        <nav id="navbar" class="navbar container">
          <ul>
            <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
            <li><a class="nav-link scrollto" href="#about">About</a></li>
            <li><a class="nav-link scrollto" href="#services">Services</a></li>
            <li><a class="nav-link scrollto" href="#team">Team</a></li>
            <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
            <li><a class="nav-link scrollto" href="/login">Login</a></li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
</template>
