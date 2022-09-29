<template>
  <div class="main-block">
    <div class="row">
      <section id="home" class="section-py-space" style="margin-top: 20px;display: block;">
        <div class="row">
          <div class="col-12 custom-container">
            Отчёт
            <div class="itemReport">
              <div class="col">27.09.2022</div>
              <div class="col">Написание системы оформления ежедневных отчётов</div>
              <div class="col">затраты часов</div>
            </div>
            <hr/>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  layout: 'default',
};
</script>

<style lang="scss" scoped>
  .itemReport{
    display: flex;
  }
</style>
