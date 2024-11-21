<script setup></script>

<template>
    <!-- Hero Section Start -->
    <div class="container mx-auto px-5 overflow-x-hidden lg:overflow-x-visible">
        <section class="grid grid-cols-none lg:grid-cols-2 pb-16 pt-8 items-center">
            <div class="lg:w-5/6 order-2 lg:order-none">
                <h1 class="text-4xl xl:text-5xl font-bold font-theme-heading text-center lg:text-left text-poppins">
                    <span class="text-theme-primary">E-skimo Energy</span> Trading Platform
                </h1>
                <p class="lg:text-xl mt-10 font-theme-content text-theme-grayish-blue text-center lg:text-left">Secure, transparent, and efficient energy trading. Buy, sell, and negotiate renewable energy seamlessly on our platform. Join us today for a sustainable energy future.</p>
                <div class="flex justify-center lg:justify-start mt-10">
                    <LinkButton class="font-poppins text-base xl:text-xl" btn-type="primary" link="#download-section">Start Selling</LinkButton>
                    <LinkButton class="font-poppins text-base xl:text-xl" btn-type="muted" link="#download-section">Start Buying</LinkButton>
                </div>
            </div>
            <div class="relative order-1 lg:order-none mb-20 lg:mt-0 lg:mb-0 lg:-mr-10">
                <img class="z-10 w-full" src="/images/buy-and-trade.webp" />
                <div class="-z-10 bg-theme-primary h-52 w-full sm:h-80 sm:w-full rounded-l-full absolute -right-28 md:-right-48 -bottom-8"></div>
            </div>
        </section>
    </div>
    <!-- Hero Section End -->
</template>

<style scoped>
.text-poppins {
  font-family: 'Poppins', sans-serif;
}

.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>