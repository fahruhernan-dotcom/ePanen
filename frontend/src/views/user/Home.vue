<template>
  <div class="container-custom py-6 md:py-8 space-y-6 md:space-y-8">
    <!-- Hero Section with Agricultural Theme -->
    <div class="relative bg-gradient-to-br from-epanen-primary via-epanen-secondary to-epanen-primary rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 text-white overflow-hidden">
      <!-- Decorative Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
          <!-- Rice field pattern -->
          <g fill="currentColor">
            <!-- Stalks of rice -->
            <path d="M100,400 L100,300 M105,400 L105,290 M110,400 L110,310" stroke="currentColor" stroke-width="3" fill="none"/>
            <ellipse cx="102" cy="290" rx="15" ry="8"/>
            <ellipse cx="105" cy="280" rx="12" ry="6"/>
            <ellipse cx="108" cy="295" rx="14" ry="7"/>

            <path d="M250,400 L250,280 M255,400 L255,270 M260,400 L260,285" stroke="currentColor" stroke-width="3" fill="none"/>
            <ellipse cx="252" cy="270" rx="16" ry="8"/>
            <ellipse cx="255" cy="260" rx="13" ry="7"/>
            <ellipse cx="258" cy="275" rx="15" ry="8"/>

            <path d="M400,400 L400,290 M405,400 L405,280 M410,400 L410,295" stroke="currentColor" stroke-width="3" fill="none"/>
            <ellipse cx="402" cy="280" rx="14" ry="7"/>
            <ellipse cx="405" cy="270" rx="12" ry="6"/>
            <ellipse cx="408" cy="285" rx="13" ry="7"/>

            <path d="M550,400 L550,285 M555,400 L555,275 M560,400 L560,290" stroke="currentColor" stroke-width="3" fill="none"/>
            <ellipse cx="552" cy="275" rx="15" ry="8"/>
            <ellipse cx="555" cy="265" rx="13" ry="7"/>
            <ellipse cx="558" cy="280" rx="14" ry="7"/>

            <path d="M700,400 L700,280 M705,400 L705,270 M710,400 L710,285" stroke="currentColor" stroke-width="3" fill="none"/>
            <ellipse cx="702" cy="270" rx="16" ry="8"/>
            <ellipse cx="705" cy="260" rx="13" ry="7"/>
            <ellipse cx="708" cy="275" rx="15" ry="8"/>

            <path d="M850,400 L850,290 M855,400 L855,280 M860,400 L860,295" stroke="currentColor" stroke-width="3" fill="none"/>
            <ellipse cx="852" cy="280" rx="14" ry="7"/>
            <ellipse cx="855" cy="270" rx="12" ry="6"/>
            <ellipse cx="858" cy="285" rx="13" ry="7"/>

            <path d="M1000,400 L1000,285 M1005,400 L1005,275 M1010,400 L1010,290" stroke="currentColor" stroke-width="3" fill="none"/>
            <ellipse cx="1002" cy="275" rx="15" ry="8"/>
            <ellipse cx="1005" cy="265" rx="13" ry="7"/>
            <ellipse cx="1008" cy="280" rx="14" ry="7"/>
          </g>

          <!-- Sun -->
          <circle cx="1050" cy="100" r="60" fill="currentColor" opacity="0.3"/>
          <circle cx="1050" cy="100" r="45" fill="currentColor" opacity="0.4"/>

          <!-- Birds -->
          <path d="M200,150 Q210,145 220,150" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M220,150 Q230,145 240,150" stroke="currentColor" stroke-width="2" fill="none"/>

          <path d="M350,120 Q358,116 366,120" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M366,120 Q374,116 382,120" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
      </div>

      <!-- Content -->
      <div class="relative z-10">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex-1 text-center md:text-left">
            <div class="inline-flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span class="text-sm font-medium">Platform Tani Digital #1 di Indonesia</span>
            </div>

            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
              Solusi Cerdas untuk
              <span class="block text-epanen-accent">Petani Indonesia</span>
            </h1>

            <p class="text-base md:text-lg lg:text-xl opacity-90 mb-4 md:mb-6 max-w-2xl">
              Dapatkan konsultasi AI, informasi harga pasar, artikel pertanian, dan bergabung dengan komunitas petani - semanya dalam satu platform!
            </p>

            <p class="text-xl md:text-2xl font-bold italic text-epanen-accent flex items-center justify-center md:justify-start">
              <svg class="w-6 h-6 md:w-7 md:h-7 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              "Yakin Kita Bisa"
            </p>
          </div>

          <!-- Right Side - Futuristic Farm Illustration -->
          <div class="hidden lg:block w-72">
            <svg viewBox="0 0 240 240" class="w-full h-auto">
              <!-- Background glow effect -->
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#A8D5A2;stop-opacity:0.3" />
                  <stop offset="100%" style="stop-color:#52A446;stop-opacity:0.6" />
                </linearGradient>
                <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#06B6D4;stop-opacity:0.8" />
                  <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:0.4" />
                </linearGradient>
              </defs>

              <!-- Smart House/Base Station -->
              <g transform="translate(60, 80)">
                <!-- Main building -->
                <rect x="0" y="40" width="80" height="60" rx="4" fill="white" opacity="0.9"/>
                <rect x="5" y="45" width="70" height="50" rx="3" fill="url(#techGradient)"/>

                <!-- Roof -->
                <path d="M-10,40 L40,10 L90,40 Z" fill="white" opacity="0.95"/>
                <path d="M-5,40 L40,15 L85,40 Z" fill="url(#techGradient)"/>

                <!-- Solar panels on roof with glow -->
                <g filter="url(#glow)">
                  <rect x="10" y="18" width="25" height="15" fill="#06B6D4" opacity="0.8"/>
                  <rect x="38" y="18" width="25" height="15" fill="#3B82F6" opacity="0.8"/>
                  <!-- Grid lines on panels -->
                  <line x1="22" y1="18" x2="22" y2="33" stroke="white" stroke-width="0.5" opacity="0.5"/>
                  <line x1="50" y1="18" x2="50" y2="33" stroke="white" stroke-width="0.5" opacity="0.5"/>
                </g>

                <!-- Digital door/screen -->
                <rect x="25" y="60" width="30" height="25" rx="2" fill="url(#screenGradient)"/>
                <!-- Screen content -->
                <circle cx="35" cy="68" r="2" fill="white" opacity="0.8"/>
                <circle cx="43" cy="68" r="2" fill="white" opacity="0.8"/>
                <rect x="30" y="73" width="10" height="8" rx="1" fill="white" opacity="0.6"/>

                <!-- WiFi signal icon -->
                <g transform="translate(60, 50)">
                  <path d="M0,5 Q3,2 6,5" stroke="white" stroke-width="1.5" fill="none" opacity="0.8"/>
                  <path d="M2,2 Q5,0 8,2" stroke="white" stroke-width="1.5" fill="none" opacity="0.6"/>
                </g>
              </g>

              <!-- Smart Digital Crops (Holographic style) -->
              <!-- Left crop with circuit patterns -->
              <g transform="translate(20, 150)">
                <!-- Stalk -->
                <rect x="8" y="20" width="4" height="40" fill="#52A446" opacity="0.8"/>

                <!-- Digital leaves with circuit pattern -->
                <ellipse cx="10" cy="15" rx="8" ry="4" fill="#A8D5A2" opacity="0.7"/>
                <ellipse cx="10" cy="8" rx="6" ry="3" fill="#52A446" opacity="0.6"/>

                <!-- Circuit lines -->
                <path d="M2,25 L10,15 L18,25" stroke="#06B6D4" stroke-width="0.5" fill="none" opacity="0.6"/>
                <circle cx="10" cy="20" r="1" fill="#06B6D4" opacity="0.8"/>
              </g>

              <!-- Right crop -->
              <g transform="translate(35, 155)">
                <rect x="8" y="20" width="4" height="35" fill="#52A446" opacity="0.8"/>
                <ellipse cx="10" cy="15" rx="8" ry="4" fill="#A8D5A2" opacity="0.7"/>
                <ellipse cx="10" cy="8" rx="6" ry="3" fill="#52A446" opacity="0.6"/>
                <path d="M2,22 L10,12 L18,22" stroke="#06B6D4" stroke-width="0.5" fill="none" opacity="0.6"/>
                <circle cx="10" cy="18" r="1" fill="#06B6D4" opacity="0.8"/>
              </g>

              <!-- Flying Drone with WiFi -->
              <g transform="translate(160, 40)">
                <!-- Drone body -->
                <ellipse cx="20" cy="15" rx="12" ry="6" fill="white" opacity="0.95"/>
                <rect x="8" y="12" width="24" height="6" rx="3" fill="url(#techGradient)" filter="url(#glow)"/>

                <!-- Rotors -->
                <ellipse cx="5" cy="15" rx="8" ry="3" fill="#A8D5A2" opacity="0.8">
                  <animateTransform attributeName="transform" type="rotate" from="0 15 0" to="360 15 0" dur="2s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="35" cy="15" rx="8" ry="3" fill="#A8D5A2" opacity="0.8">
                  <animateTransform attributeName="transform" type="rotate" from="0 35 0" to="360 35 0" dur="2s" repeatCount="indefinite"/>
                </ellipse>

                <!-- Camera/sensor -->
                <circle cx="20" cy="13" r="2" fill="#06B6D4"/>

                <!-- WiFi waves -->
                <g opacity="0.6">
                  <path d="M22,8 Q25,5 28,8" stroke="#06B6D4" stroke-width="1" fill="none"/>
                  <path d="M25,6 Q30,3 35,6" stroke="#06B6D4" stroke-width="1" fill="none" opacity="0.7"/>
                </g>
              </g>

              <!-- Smartphone with farm app -->
              <g transform="translate(180, 120)">
                <!-- Phone body -->
                <rect x="0" y="0" width="30" height="50" rx="4" fill="white" opacity="0.95" stroke="#A8D5A2" stroke-width="1"/>

                <!-- Screen -->
                <rect x="3" y="5" width="24" height="35" fill="url(#screenGradient)"/>

                <!-- App interface elements -->
                <rect x="5" y="10" width="20" height="3" rx="1" fill="white" opacity="0.6"/>
                <rect x="5" y="15" width="15" height="2" rx="1" fill="white" opacity="0.4"/>
                <rect x="5" y="19" width="18" height="2" rx="1" fill="white" opacity="0.4"/>
                <rect x="5" y="23" width="12" height="2" rx="1" fill="white" opacity="0.4"/>

                <!-- Chart line -->
                <path d="M5,30 L10,28 L15,31 L20,26 L25,29" stroke="#52A446" stroke-width="1.5" fill="none"/>

                <!-- Bottom button -->
                <rect x="8" y="43" width="14" height="3" rx="1.5" fill="#52A446"/>
              </g>

              <!-- Data streams/nodes connecting -->
              <g stroke="#06B6D4" stroke-width="1" fill="none" opacity="0.5" stroke-dasharray="3,3">
                <path d="M140,120 Q160,100 180,115">
                  <animate attributeName="stroke-dashoffset" from="0" to="20" dur="3s" repeatCount="indefinite"/>
                </path>
                <path d="M180,140 Q200,130 220,150">
                  <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2.5s" repeatCount="indefinite"/>
                </path>
              </g>

              <!-- Floating data nodes -->
              <circle cx="160" cy="115" r="3" fill="#06B6D4" opacity="0.7">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="200" cy="145" r="2.5" fill="#3B82F6" opacity="0.7">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>
              </circle>

              <!-- Ground with tech pattern -->
              <path d="M0,190 Q60,180 120,190 T240,190" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
              <path d="M0,195 Q60,185 120,195 T240,195" stroke="white" stroke-width="1" fill="none" opacity="0.2"/>

              <!-- Hexagonal tech grid on ground -->
              <g stroke="#06B6D4" stroke-width="0.5" fill="none" opacity="0.2">
                <polygon points="30,188 35,183 40,188 35,193 30,193 25,188"/>
                <polygon points="90,187 95,182 100,187 95,192 90,192 85,187"/>
                <polygon points="150,188 155,183 160,188 155,193 150,193 145,188"/>
                <polygon points="210,187 215,182 220,187 215,192 210,192 205,187"/>
              </g>
            </svg>
          </div>
        </div>

        <!-- CTA for Guest -->
        <div v-if="!isAuthenticated" class="mt-6 md:mt-8 p-4 md:p-6 bg-white bg-opacity-15 backdrop-blur-md rounded-xl border border-white border-opacity-30">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="text-center md:text-left">
              <p class="font-bold text-lg md:text-xl mb-1">🌱 Bergabunglah dengan Ribuan Petani Indonesia!</p>
              <p class="text-sm opacity-90">Akses penuh semua fitur dalam 1 menit</p>
            </div>
            <div class="flex flex-wrap gap-3 justify-center">
              <router-link
                to="/register"
                class="inline-flex items-center px-6 py-3 bg-white text-epanen-primary rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Daftar Gratis
              </router-link>
              <router-link
                to="/login"
                class="inline-flex items-center px-6 py-3 bg-epanen-accent text-epanen-primary rounded-xl font-bold hover:bg-opacity-80 transition-all shadow-lg hover:shadow-xl"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Masuk
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <!-- Nella AI - Always Open -->
      <router-link
        to="/chat"
        class="group bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center relative overflow-hidden border-2 border-transparent hover:border-epanen-primary"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative z-10">
          <div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-epanen-primary to-epanen-secondary rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 class="font-bold text-epanen-primary text-sm md:text-base mb-1">Nella AI</h3>
          <p class="text-xs md:text-sm text-gray-600 mb-2">Konsultasi 24/7</p>
          <span class="inline-flex items-center text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full font-medium shadow-sm">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Gratis
          </span>
        </div>
      </router-link>

      <!-- Pengetahuan - Locked for Guest -->
      <div
        v-if="!isAuthenticated"
        @click="showLoginModal('Pengetahuan')"
        class="group bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer text-center relative overflow-hidden border-2 border-transparent hover:border-epanen-primary"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="absolute inset-0 bg-gray-100 bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm z-20">
          <div class="text-center transform scale-90 group-hover:scale-100 transition-transform">
            <svg class="w-10 h-10 md:w-12 md:h-12 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p class="text-sm md:text-base font-bold text-gray-700">Login untuk Akses</p>
            <p class="text-xs text-gray-600">Klik untuk masuk</p>
          </div>
        </div>
        <div class="relative z-10">
          <div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="font-bold text-gray-800 text-sm md:text-base mb-1">Pengetahuan</h3>
          <p class="text-xs md:text-sm text-gray-600">Artikel & Tips</p>
        </div>
      </div>
      <router-link
        v-else
        to="/articles"
        class="group bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center relative overflow-hidden border-2 border-transparent hover:border-epanen-primary"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative z-10">
          <div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="font-bold text-gray-800 text-sm md:text-base mb-1">Pengetahuan</h3>
          <p class="text-xs md:text-sm text-gray-600">Artikel & Tips</p>
        </div>
      </router-link>

      <!-- Harga Pasar - Locked for Guest -->
      <div
        v-if="!isAuthenticated"
        @click="showLoginModal('Harga Pasar')"
        class="group bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer text-center relative overflow-hidden border-2 border-transparent hover:border-epanen-primary"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="absolute inset-0 bg-gray-100 bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm z-20">
          <div class="text-center transform scale-90 group-hover:scale-100 transition-transform">
            <svg class="w-10 h-10 md:w-12 md:h-12 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p class="text-sm md:text-base font-bold text-gray-700">Login untuk Akses</p>
            <p class="text-xs text-gray-600">Klik untuk masuk</p>
          </div>
        </div>
        <div class="relative z-10">
          <div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-bold text-gray-800 text-sm md:text-base mb-1">Harga Pasar</h3>
          <p class="text-xs md:text-sm text-gray-600">Info Komoditas</p>
        </div>
      </div>
      <router-link
        v-else
        to="/prices"
        class="group bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center relative overflow-hidden border-2 border-transparent hover:border-epanen-primary"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative z-10">
          <div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-bold text-gray-800 text-sm md:text-base mb-1">Harga Pasar</h3>
          <p class="text-xs md:text-sm text-gray-600">Info Komoditas</p>
        </div>
      </router-link>

      <!-- Komunitas - Locked for Guest -->
      <div
        v-if="!isAuthenticated"
        @click="showLoginModal('Komunitas')"
        class="group bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer text-center relative overflow-hidden border-2 border-transparent hover:border-epanen-primary"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="absolute inset-0 bg-gray-100 bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm z-20">
          <div class="text-center transform scale-90 group-hover:scale-100 transition-transform">
            <svg class="w-10 h-10 md:w-12 md:h-12 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p class="text-sm md:text-base font-bold text-gray-700">Login untuk Akses</p>
            <p class="text-xs text-gray-600">Klik untuk masuk</p>
          </div>
        </div>
        <div class="relative z-10">
          <div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="font-bold text-gray-800 text-sm md:text-base mb-1">Komunitas</h3>
          <p class="text-xs md:text-sm text-gray-600">Forum Diskusi</p>
        </div>
      </div>
      <router-link
        v-else
        to="/discussions"
        class="group bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center relative overflow-hidden border-2 border-transparent hover:border-epanen-primary"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative z-10">
          <div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="font-bold text-gray-800 text-sm md:text-base mb-1">Komunitas</h3>
          <p class="text-xs md:text-sm text-gray-600">Forum Diskusi</p>
        </div>
      </router-link>
    </div>

    <!-- Hero Carousel - Info Slider -->
    <section class="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl">
      <div class="relative h-64 md:h-80">
        <!-- Slides -->
        <div
          v-for="(slide, index) in slides"
          :key="index"
          v-show="currentSlide === index"
          class="absolute inset-0 transition-all duration-700 ease-in-out"
          :class="{ 'opacity-0 scale-105': currentSlide !== index, 'opacity-100 scale-100': currentSlide === index }"
        >
          <!-- Slide Background with Gradient -->
          <div
            class="absolute inset-0"
            :style="{ background: slide.gradient }"
          ></div>

          <!-- Decorative Pattern -->
          <div class="absolute inset-0 opacity-20">
            <svg class="w-full h-full" viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice">
              <g fill="currentColor">
                <!-- Rice patterns -->
                <circle cx="100" cy="100" r="80"/>
                <circle cx="400" cy="150" r="100"/>
                <circle cx="700" cy="80" r="90"/>
                <circle cx="1000" cy="120" r="85"/>
                <circle cx="1150" cy="200" r="70"/>
                <!-- Wheat stalks -->
                <path v-for="i in 15" :key="i"
                      :d="`M${i * 80},320 L${i * 80},${200 + Math.random() * 100}`"
                      stroke="currentColor" stroke-width="4" fill="none" opacity="0.5"/>
              </g>
            </svg>
          </div>

          <!-- Slide Content -->
          <div class="relative z-10 h-full flex items-center">
            <div class="container-custom">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <!-- Text Content -->
                <div class="text-white space-y-3 md:space-y-4">
                  <div class="inline-flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span class="text-sm font-medium">{{ slide.badge }}</span>
                  </div>
                  <h2 class="text-2xl md:text-4xl font-bold leading-tight">{{ slide.title }}</h2>
                  <p class="text-base md:text-lg opacity-90 max-w-lg">{{ slide.description }}</p>
                  <div class="flex items-center space-x-4 pt-2">
                    <router-link
                      v-if="slide.link"
                      :to="slide.link"
                      class="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                    >
                      {{ slide.cta }}
                      <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </router-link>
                  </div>
                </div>

                <!-- Icon/Illustration -->
                <div class="hidden md:flex justify-center">
                  <div class="w-48 h-48 bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
                    <div v-html="slide.icon" class="w-32 h-32"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Navigation Dots -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-20">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-white w-8' : 'bg-white bg-opacity-50 hover:bg-opacity-75'"
          ></button>
        </div>

        <!-- Arrow Navigation -->
        <button
          @click="previousSlide"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all z-20 hover:scale-110"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all z-20 hover:scale-110"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>

    <!-- Featured Articles Preview (for guests) -->
    <section v-if="!isAuthenticated" class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
          <svg class="w-6 h-6 md:w-7 md:h-7 mr-2 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          Artikel Terbaru
        </h2>
        <router-link to="/login" class="text-sm text-epanen-primary hover:text-epanen-secondary font-medium">
          Lihat Semua →
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div
          v-for="i in 3"
          :key="i"
          @click="showLoginModal('Artikel')"
          class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border-2 border-transparent hover:border-epanen-primary"
        >
          <div class="h-40 md:h-48 bg-gradient-to-br from-epanen-light to-amber-50 relative">
            <div class="absolute inset-0 bg-gray-100 bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
              <div class="text-center">
                <svg class="w-12 h-12 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p class="text-sm font-bold text-gray-700">Login untuk Membaca</p>
              </div>
            </div>
            <div class="absolute bottom-3 left-3">
              <span class="px-3 py-1 bg-epanen-primary text-white text-xs rounded-full">Tips</span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-bold text-gray-900 mb-2 line-clamp-2">Cara Menanam Padi dengan Metode SRI</h3>
            <p class="text-sm text-gray-600 line-clamp-2">Pelajari teknik menanam padi yang lebih hemat bibit dan hasil panen melimpah...</p>
            <div class="mt-3 flex items-center text-xs text-gray-500">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              5 menit baca
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <div class="bg-white p-4 md:p-6 rounded-xl shadow-md text-center border border-gray-100">
        <div class="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3">
          <svg class="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <p class="text-2xl md:text-3xl font-bold text-epanen-primary">5K+</p>
        <p class="text-xs md:text-sm text-gray-600">Petani Aktif</p>
      </div>

      <div class="bg-white p-4 md:p-6 rounded-xl shadow-md text-center border border-gray-100">
        <div class="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3">
          <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <p class="text-2xl md:text-3xl font-bold text-epanen-primary">50K+</p>
        <p class="text-xs md:text-sm text-gray-600">Pertanyaan</p>
      </div>

      <div class="bg-white p-4 md:p-6 rounded-xl shadow-md text-center border border-gray-100">
        <div class="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3">
          <svg class="w-5 h-5 md:w-6 md:h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <p class="text-2xl md:text-3xl font-bold text-epanen-primary">200+</p>
        <p class="text-xs md:text-sm text-gray-600">Artikel</p>
      </div>

      <div class="bg-white p-4 md:p-6 rounded-xl shadow-md text-center border border-gray-100">
        <div class="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3">
          <svg class="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        </div>
        <p class="text-2xl md:text-3xl font-bold text-epanen-primary">98%</p>
        <p class="text-xs md:text-sm text-gray-600">Kepuasan</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);

// Carousel data
const currentSlide = ref(0);
const slides = ref([
  {
    badge: 'Fitur Unggulan',
    title: 'Konsultasi AI 24/7 untuk Petani',
    description: 'Tanya apa saja tentang pertanian - dari budidaya, hama, harga pasar, hingga tips panen. AI pakar kami siap membantu kapan saja!',
    cta: 'Mulai Chat',
    link: '/chat',
    gradient: 'linear-gradient(135deg, #2D5A27 0%, #52A446 50%, #A8D5A2 100%)',
    icon: `<svg class="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
              <circle cx="12" cy="12" r="10" stroke-opacity="0.3"/>
              <path d="M12 6c-2 0-3.5 2-4.5 4s1.5 5 3 6" stroke-opacity="0.5"/>
              <path d="M12 18c2 0 3.5-2 4.5-4s-1.5-5-3-6" stroke-opacity="0.5"/>
            </svg>`
  },
  {
    badge: 'Info Pasar',
    title: 'Pantau Harga Komoditas Terkini',
    description: 'Dapatkan informasi harga pasar terbaru untuk padi, jagung, cabai, dan komoditas lainnya. Jangan jual murah! Cek harga dulu di ePanen.',
    cta: 'Cek Harga',
    link: '/prices',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #22D3EE 100%)',
    icon: `<svg class="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              <path d="M12 3v18M3 12h18" stroke-opacity="0.3"/>
              <circle cx="12" cy="12" r="8" stroke-opacity="0.5"/>
            </svg>`
  },
  {
    badge: 'Pengetahuan',
    title: '200+ Artikel Pertanian Gratis',
    description: 'Pelajari teknik budidaya modern, pengendalian hama, tips panen, dan banyak lagi. Artikel ditulis oleh pakar pertanian untuk petani.',
    cta: 'Baca Artikel',
    link: '/articles',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #F97316 50%, #FB923C 100%)',
    icon: `<svg class="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              <path d="M9 12l2 2 4-4" stroke-opacity="0.5"/>
              <circle cx="12" cy="12" r="10" stroke-opacity="0.3"/>
            </svg>`
  },
  {
    badge: 'Komunitas',
    title: 'Bergabung dengan 5,000+ Petani',
    description: 'Berbagi pengalaman, tukar informasi, dan diskusi dengan sesama petani. Kumpul komunitas, saling membantu untuk pertanian yang lebih baik!',
    cta: 'Gabung Komunitas',
    link: '/discussions',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F472B6 100%)',
    icon: `<svg class="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              <circle cx="9" cy="9" r="2" fill="currentColor" opacity="0.5"/>
              <circle cx="15" cy="9" r="2" fill="currentColor" opacity="0.5"/>
              <circle cx="12" cy="16" r="2" fill="currentColor" opacity="0.5"/>
              <circle cx="12" cy="12" r="10" stroke-opacity="0.3"/>
            </svg>`
  }
]);

let autoSlideInterval = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1;
};

const goToSlide = (index) => {
  currentSlide.value = index;
  resetAutoSlide();
};

const resetAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
  autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
};

onMounted(() => {
  resetAutoSlide();
});

onUnmounted(() => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
});

const showLoginModal = (feature) => {
  router.push('/login');
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
