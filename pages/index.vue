<template>
    <section class="flex align-middle h-screen mt-[-60px]">
        <div class="container mx-auto p-4 flex flex-col justify-center items-center text-center text-white">
            <h1 class="font-bold text-2xl">{{ $t('home__title') }}</h1>
            <div>
                <ul class="pt-10">
                    <li>
                        <h2 class="font-bold text-xl p-4">{{ $t('home__instructions-title') }}</h2>
                        <ul class="text-lg">
                            <li>
                                {{ $t('home__instructions-content-step1') }}
                            </li>
                            <li>
                                {{ $t('home__instructions-content-step2') }}
                            </li>
                        </ul>
                    </li>
                </ul>
                <AuthorizationButton class="mt-4 bg-cyan-400 hover:bg-cyan-600 p-2" />
            </div>
        </div>
    </section>
</template>