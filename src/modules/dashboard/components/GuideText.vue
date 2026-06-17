<template>
    <h1 id="motivational-text" class="relative pl-8">
        <slot></slot>
    </h1>
</template>

<style lang="css" scoped>
#motivational-text::before {
    content: '';
    width: 4px;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: var(--color-header);
}
</style>
