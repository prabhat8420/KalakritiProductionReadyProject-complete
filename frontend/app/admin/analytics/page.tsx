'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/services/api-client';
import { AdminGuard } from '@/components/admin/AdminGuard';

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    apiClient<any>('/admin/analytics/overview').then((res) => {
      if (res.data) setData(res.data);
    });
  }, []);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#faf8f5] py-10 px-4 max-w-5xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase text-orange-800">Operational Observability</span>
          <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">Platform Analytics & Metrics</h1>
        </div>

        {!data ? (
          <p className="text-xs text-stone-500">Loading metrics rollups...</p>
        ) : (
          <div className="space-y-8">
            {/* Key Financial Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <span className="text-[11px] font-bold uppercase text-stone-500">Gross Marketplace Volume (GMV)</span>
                <h3 className="text-2xl font-bold text-stone-900 mt-1">₹{data.metrics.total_gmv.toLocaleString('en-IN')}</h3>
                <p className="text-[11px] text-emerald-700 mt-2">↑ 100% processed via Razorpay</p>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <span className="text-[11px] font-bold uppercase text-stone-500">Artisan Net Escrow Share (85%)</span>
                <h3 className="text-2xl font-bold text-emerald-800 mt-1">₹{data.metrics.artisan_direct_payouts.toLocaleString('en-IN')}</h3>
                <p className="text-[11px] text-stone-500 mt-2">Direct studio payout pipeline</p>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <span className="text-[11px] font-bold uppercase text-stone-500">Platform Net Commission (10%)</span>
                <h3 className="text-2xl font-bold text-[#c55337] mt-1">₹{data.metrics.platform_net_revenue.toLocaleString('en-IN')}</h3>
                <p className="text-[11px] text-stone-500 mt-2">Marketplace operational revenue</p>
              </div>
            </div>

            {/* Operational Numbers */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">Marketplace Entities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-[#faf8f5] rounded-xl border border-stone-200">
                  <span className="text-2xl font-bold text-stone-900">{data.metrics.total_orders}</span>
                  <p className="text-xs text-stone-500 mt-1">Total Orders</p>
                </div>
                <div className="p-4 bg-[#faf8f5] rounded-xl border border-stone-200">
                  <span className="text-2xl font-bold text-stone-900">{data.metrics.registered_artisans}</span>
                  <p className="text-xs text-stone-500 mt-1">Verified Artisans</p>
                </div>
                <div className="p-4 bg-[#faf8f5] rounded-xl border border-stone-200">
                  <span className="text-2xl font-bold text-stone-900">{data.metrics.registered_customers}</span>
                  <p className="text-xs text-stone-500 mt-1">Customers</p>
                </div>
                <div className="p-4 bg-[#faf8f5] rounded-xl border border-stone-200">
                  <span className="text-2xl font-bold text-stone-900">{data.metrics.catalog_products}</span>
                  <p className="text-xs text-stone-500 mt-1">Products Listed</p>
                </div>
              </div>
            </div>

            {/* System Cluster Status */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-2">
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider mb-3">Cluster Health & Prometheus Observability</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-semibold">
                  FastAPI: {data.system_health.api_cluster}
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-semibold">
                  Redis: {data.system_health.redis_cache}
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-semibold">
                  Celery: {data.system_health.celery_workers}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}

