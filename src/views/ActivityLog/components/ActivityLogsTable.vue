<script setup lang="ts" generic="TData, TValue">
import { columns as tableColumns } from './columns.ts'
import { useActivityLogStore } from '@/stores/useActivityLogStore'
import { storeToRefs } from 'pinia'

import DataTable from '@/components/reusable/DataTable.vue'
import { fetchActivityLogsService } from '@/services/activityLogService'

const activityLogStore = useActivityLogStore()

const { activityLogs, loading, pagination } = storeToRefs(activityLogStore)
</script>

<template>
  <DataTable
    :data="activityLogs"
    :table-columns="tableColumns"
    :loading="loading.activityLogs"
    :pagination="pagination"
    :handle-fetch-data="fetchActivityLogsService"
  >
  </DataTable>
</template>
