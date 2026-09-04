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
      <div className="min-h-screen bg-[#F7F2E7] py-16 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C3826]">
            Operational Observability
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-1">Platform Analytics & Metrics</h1>
          <p className="text-xs text-[#6E655F] mt-1.5">Live telemetry of GMV, artisan direct escrow, and cluster health.</p>
        </div>

        {!data ? (
          <p className="font-mono text-xs text-[#6E655F]">Loading metrics rollups...</p>
        ) : (
          <div className="space-y-8">
            {/* Key Financial Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-2xl p-6 shadow-sm">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#6E655F]">Gross Marketplace Volume (GMV)</span>
                <h3 className="font-serif text-3xl font-bold text-[#1C1917] mt-1">₹{data.metrics.total_gmv.toLocaleString('en-IN')}</h3>
                <p className="font-mono text-[11px] text-emerald-800 mt-2">↑ 100% processed via Razorpay</p>
              </div>

              <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-2xl p-6 shadow-sm">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#6E655F]">Artisan Net Escrow Share (85%)</span>
                <h3 className="font-serif text-3xl font-bold text-emerald-900 mt-1">₹{data.metrics.artisan_direct_payouts.toLocaleString('en-IN')}</h3>
                <p className="font-mono text-[11px] text-[#6E655F] mt-2">Direct studio payout pipeline</p>
              </div>

              <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-2xl p-6 shadow-sm">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#6E655F]">Platform Net Commission (10%)</span>
                <h3 className="font-serif text-3xl font-bold text-[#8C3826] mt-1">₹{data.metrics.platform_net_revenue.toLocaleString('en-IN')}</h3>
                <p className="font-mono text-[11px] text-[#6E655F] mt-2">Marketplace operational revenue</p>
              </div>
            </div>

            {/* Operational Numbers */}
            <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#1C1917] uppercase tracking-[0.2em]">Marketplace Entities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-[#F7F2E7] rounded-xl border border-[#E3DACB]">
                  <span className="font-serif text-2xl font-bold text-[#1C1917]">{data.metrics.total_orders}</span>
                  <p className="font-mono text-xs text-[#6E655F] mt-1">Total Orders</p>
                </div>
                <div className="p-4 bg-[#F7F2E7] rounded-xl border border-[#E3DACB]">
                  <span className="font-serif text-2xl font-bold text-[#1C1917]">{data.metrics.registered_artisans}</span>
                  <p className="font-mono text-xs text-[#6E655F] mt-1">Verified Artisans</p>
                </div>
                <div className="p-4 bg-[#F7F2E7] rounded-xl border border-[#E3DACB]">
                  <span className="font-serif text-2xl font-bold text-[#1C1917]">{data.metrics.registered_customers}</span>
                  <p className="font-mono text-xs text-[#6E655F] mt-1">Customers</p>
                </div>
                <div className="p-4 bg-[#F7F2E7] rounded-xl border border-[#E3DACB]">
                  <span className="font-serif text-2xl font-bold text-[#1C1917]">{data.metrics.catalog_products}</span>
                  <p className="font-mono text-xs text-[#6E655F] mt-1">Craft Specimens</p>
                </div>
              </div>
            </div>

            {/* System Cluster Status */}
            <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-2xl p-6 shadow-sm space-y-2">
              <h3 className="font-mono text-xs font-bold text-[#1C1917] uppercase tracking-[0.2em] mb-3">Cluster Health & Prometheus Observability</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-950 font-semibold">
                  FastAPI: {data.system_health.api_cluster}
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-950 font-semibold">
                  Redis: {data.system_health.redis_cache}
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-950 font-semibold">
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

