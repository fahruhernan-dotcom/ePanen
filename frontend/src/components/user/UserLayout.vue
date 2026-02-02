<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
    <!-- Header with Farm Pattern -->
    <header class="bg-gradient-to-r from-epanen-primary via-epanen-secondary to-epanen-primary text-white shadow-lg sticky top-0 z-50 relative">
      <!-- Decorative farm pattern -->
      <div class="absolute inset-0 opacity-10 overflow-hidden">
        <svg class="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <!-- Rice field waves pattern -->
          <path d="M0,50 Q100,30 200,50 T400,50 T600,50 T800,50 T1000,50 T1200,50 V100 H0 Z" fill="currentColor"/>
          <path d="M0,60 Q100,40 200,60 T400,60 T600,60 T800,60 T1000,60 T1200,60 V100 H0 Z" fill="currentColor" opacity="0.5"/>
          <!-- Wheat/sheaves pattern -->
          <g fill="currentColor">
            <circle cx="50" cy="30" r="8"/>
            <circle cx="150" cy="25" r="6"/>
            <circle cx="250" cy="35" r="7"/>
            <circle cx="350" cy="28" r="5"/>
            <circle cx="450" cy="32" r="8"/>
            <circle cx="550" cy="26" r="6"/>
            <circle cx="650" cy="34" r="7"/>
            <circle cx="750" cy="29" r="5"/>
            <circle cx="850" cy="33" r="8"/>
            <circle cx="950" cy="27" r="6"/>
            <circle cx="1050" cy="35" r="7"/>
            <circle cx="1150" cy="30" r="5"/>
          </g>
        </svg>
      </div>

      <div class="container-custom relative">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Logo with leaf icon -->
          <router-link to="/" class="flex items-center space-x-2 md:space-x-3 group">
            <div class="relative">
              <div class="w-10 h-10 md:w-12 md:h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-opacity-30 transition-all">
                <svg class="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C7.5 2 4 6.5 4 12c0 5.5 3.5 10 8 10s8-4.5 8-10c0-5.5-3.5-10-8-10zm0 18c-3.5 0-6-3.5-6-8s2.5-8 6-8 6 3.5 6 8-2.5 8-6 8z"/>
                  <path d="M12 6c-1.5 0-2.5 1.5-2.5 3s1 3 2.5 3 2.5-1.5 2.5-3-1-3-2.5-3z"/>
                </svg>
              </div>
              <!-- Small leaf decoration -->
              <div class="absolute -top-1 -right-1 w-4 h-4 bg-epanen-accent rounded-full flex items-center justify-center">
                <svg class="w-2.5 h-2.5 text-epanen-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8 6 4 10 4 14c0 4 3.5 8 8 8s8-4 8-8c0-4-4-8-8-12z"/>
                </svg>
              </div>
            </div>
            <div>
              <span class="text-xl md:text-2xl font-bold">ePanen</span>
              <p class="text-[10px] md:text-xs text-epanen-accent hidden sm:block">Solusi Tani Cerdas</p>
            </div>
          </router-link>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-1">
            <router-link
              to="/"
              class="flex items-center space-x-1.5 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all group"
              active-class="bg-white bg-opacity-20"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="font-medium">Beranda</span>
            </router-link>
            <router-link
              to="/chat"
              class="flex items-center space-x-1.5 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all group"
              active-class="bg-white bg-opacity-20"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span class="font-medium">Nella</span>
            </router-link>
            <router-link
              to="/articles"
              class="flex items-center space-x-1.5 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all group"
              active-class="bg-white bg-opacity-20"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span class="font-medium">Pengetahuan</span>
            </router-link>
            <router-link
              to="/prices"
              class="flex items-center space-x-1.5 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all group"
              active-class="bg-white bg-opacity-20"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="font-medium">Harga Pasar</span>
            </router-link>
            <router-link
              to="/discussions"
              class="flex items-center space-x-1.5 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all group"
              active-class="bg-white bg-opacity-20"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="font-medium">Komunitas</span>
            </router-link>
          </nav>

          <!-- User Menu -->
          <div class="flex items-center space-x-3">
            <div class="hidden md:block text-right">
              <p class="text-sm font-semibold">{{ authStore.user?.name || 'Petani' }}</p>
              <p class="text-xs text-epanen-accent flex items-center justify-end">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8 6 4 10 4 14c0 4 3.5 8 8 8s8-4 8-8c0-4-4-8-8-12z"/>
                </svg>
                Mitra Tani
              </p>
            </div>
            <div class="relative" ref="menuRef">
              <button
                @click="showMenu = !showMenu"
                class="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-2 rounded-xl hover:bg-opacity-30 transition-all backdrop-blur-sm"
              >
                <span class="w-9 h-9 bg-gradient-to-br from-epanen-accent to-white rounded-full flex items-center justify-center text-epanen-primary font-bold text-sm shadow-sm">
                  {{ authStore.user?.name?.charAt(0).toUpperCase() || 'P' }}
                </span>
                <svg class="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                v-if="showMenu"
                class="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100"
              >
                <div class="px-4 py-3 border-b border-gray-100">
                  <p class="text-sm font-semibold text-gray-900">{{ authStore.user?.name }}</p>
                  <p class="text-xs text-gray-500">{{ authStore.user?.email }}</p>
                </div>
                <router-link
                  to="/profile"
                  class="flex items-center space-x-2 px-4 py-2.5 text-gray-700 hover:bg-green-50 transition-colors"
                  @click="showMenu = false"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span class="text-sm">Profil Saya</span>
                </router-link>
                <button
                  @click.stop="handleLogout"
                  class="w-full flex items-center space-x-2 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span class="text-sm">Keluar</span>
                </button>
              </div>
            </div>

            <!-- Mobile menu button -->
            <button
              @click="showMobileMenu = !showMobileMenu"
              class="lg:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="showMobileMenu" class="lg:hidden bg-white bg-opacity-10 backdrop-blur-md border-t border-white border-opacity-20 px-4 py-4 space-y-2">
        <router-link to="/" class="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="font-medium">Beranda</span>
        </router-link>
        <router-link to="/chat" class="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span class="font-medium">Tanya Pakar</span>
        </router-link>
        <router-link to="/articles" class="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span class="font-medium">Pengetahuan</span>
        </router-link>
        <router-link to="/prices" class="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium">Harga Pasar</span>
        </router-link>
        <router-link to="/discussions" class="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="font-medium">Komunitas</span>
        </router-link>
        <router-link to="/profile" class="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="font-medium">Profil</span>
        </router-link>
        <button @click="handleLogout" class="w-full flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-red-500 hover:bg-opacity-20 transition-all text-red-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class="font-medium">Keluar</span>
        </button>
      </div>
    </header>

    <!-- Main content -->
    <main class="py-4 md:py-6">
      <router-view />
    </main>

    <!-- Farm-themed Footer -->
    <footer class="bg-gradient-to-r from-epanen-primary via-epanen-secondary to-epanen-primary text-white relative overflow-hidden">
      <!-- Decorative rice field pattern -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <!-- Rolling hills pattern -->
          <path d="M0,100 Q200,60 400,100 T800,100 T1200,100 V200 H0 Z" fill="currentColor"/>
          <path d="M0,120 Q200,80 400,120 T800,120 T1200,120 V200 H0 Z" fill="currentColor" opacity="0.5"/>
          <path d="M0,140 Q200,100 400,140 T800,140 T1200,140 V200 H0 Z" fill="currentColor" opacity="0.3"/>
        </svg>
      </div>

      <div class="container-custom relative">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <!-- Brand Section -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C7.5 2 4 6.5 4 12c0 5.5 3.5 10 8 10s8-4.5 8-10c0-5.5-3.5-10-8-10zm0 18c-3.5 0-6-3.5-6-8s2.5-8 6-8 6 3.5 6 8-2.5 8-6 8z"/>
                  <path d="M12 6c-1.5 0-2.5 1.5-2.5 3s1 3 2.5 3 2.5-1.5 2.5-3-1-3-2.5-3z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold">ePanen</h3>
                <p class="text-sm text-epanen-accent">Platform Tani Digital</p>
              </div>
            </div>
            <p class="text-sm text-gray-200 leading-relaxed">
              Membantu petani Indonesia dengan teknologi dan informasi pertanian yang mudah diakses.
            </p>
          </div>

          <!-- Features Section -->
          <div class="space-y-4">
            <h4 class="font-semibold text-lg flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Fitur Unggulan
            </h4>
            <ul class="space-y-2 text-sm text-gray-200">
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-epanen-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Nella AI 24/7</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-epanen-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Info Harga Pasar Terkini</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-epanen-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Artikel & Tips Pertanian</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-epanen-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Komunitas Petani</span>
              </li>
            </ul>
          </div>

          <!-- Contact Section -->
          <div class="space-y-4">
            <h4 class="font-semibold text-lg flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Hubungi Kami
            </h4>
            <ul class="space-y-2 text-sm text-gray-200">
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@epanen.id</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+62 812-3456-7890</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white border-opacity-20 py-6">
          <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p class="text-sm text-gray-200 flex items-center">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8 6 4 10 4 14c0 4 3.5 8 8 8s8-4 8-8c0-4-4-8-8-12z"/>
              </svg>
              © {{ new Date().getFullYear() }} ePanen. Dibuat dengan ❤ untuk Petani Indonesia
            </p>
            <p class="text-lg font-bold text-epanen-accent flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              "Yakin Kita Bisa"
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const showMenu = ref(false);
const showMobileMenu = ref(false);
const menuRef = ref(null);

const handleLogout = () => {
  authStore.logout();
  showMenu.value = false;
  showMobileMenu.value = false;
  router.push('/login');
};

const handleClickOutside = (e) => {
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    showMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
