<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/"
        >
          <img
            src="~assets/buefy.png"
            alt="Buefy"
            height="28"
          >
        </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">
          General
        </p>
        <ul class="menu-list">
          <li
            v-for="(item, key) of items"
            :key="key"
          >
            <nuxt-link
              :to="item.to"
              exact-active-class="is-active"
            >
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <section class="section">
          <div class="columns is-centered">
              <div class="column is-three-quarters">
                  <div class="box">
                    <nuxt />
                  </div>
              </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: '旅人一覧',
          to: '/admin/travelers'
        },
        {
          title: '頼みごと一覧',
          to: '/admin/request'
        },
        {
          title: '場所一覧',
          to: '/admin/place'
        },
        {
            title: '場所登録',
            to: '/admin/placeadd'
        },
        {
            title: '行動履歴',
            to: '/admin/movementhistory'
        }
      ]
    }
  }
}
</script>