<script lang="ts" setup>
const { data } = useFetch('/api/packages')

const columns = [{
  key: 'name',
  label: 'Name',
  sortable: true,
}, {
  key: 'stars',
  label: 'Stars',
  sortable: true,
}, {
  key: 'monthlyDownloads',
  label: 'Monthly Downloads',
  sortable: true,
}, {
  key: 'watchers',
  label: 'Watchers',
  sortable: true,
}, {
  key: 'forks',
  label: 'Forks',
  sortable: true,
}, {
  key: 'contributors',
  label: 'Contributors',
  sortable: true,
}]
</script>

<template>
  <UContainer>
    <UTable v-if="data" :rows="data" :columns="columns">
      <template #name-data="{ row }">
        <NuxtLink :href="`https://github.com/unjs/${row.name}`" target="_blank" class="hover:text-primary">
          {{ row.name }}
        </NuxtLink>
      </template>
      <template #contributors-data="{ row }">
        {{ row.contributors.toLocaleString() }}
      </template>
      <template #monthlyDownloads-data="{ row }">
        <NuxtLink :href="`https://www.npmjs.com/package/${row.name}`" target="_blank" class="hover:text-primary">
          {{ row.monthlyDownloads.toLocaleString() }}
        </NuxtLink>
      </template>
      <template #stars-data="{ row }">
        {{ row.stars.toLocaleString() }}
      </template>
      <template #watchers-data="{ row }">
        {{ row.watchers.toLocaleString() }}
      </template>
      <template #forks-data="{ row }">
        {{ row.forks.toLocaleString() }}
      </template>
    </UTable>
  </UContainer>
</template>
