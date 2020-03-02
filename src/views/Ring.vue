<template>
    <div>
     <ul class='ringUl'>
        <li>
             <i class="fas fa-bell"></i>
             <span>1</span>
        </li>
        <li>
            <i class="fas fa-bell"></i>
            <span>2</span>
        </li>
        <li>
            <i class="fas fa-bell"></i>
            <span>3</span>
        </li>
     </ul>
    </div>
</template>

<style lang="scss">
    .ringUl{
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $color-sec;
        li{
            position: relative;
            font-size: $fontsize-xxxl;
            margin: 20px;
            padding: 20px;
            transition: all .5s;
            border-radius: 3px;
            @include pointer;
            &:hover, &.active{
                color: $color-master;
                box-shadow: 0 0 0 1px $color-sec inset;
            }
        }
        span{
            position: absolute;
            font-size: 20px;
            top: 45px;
            left: 45px;
            color: $color-six;
        }
    }
</style>