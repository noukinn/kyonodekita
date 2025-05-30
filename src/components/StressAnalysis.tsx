import React from 'react';
import { Leaf, AlertCircle } from 'lucide-react';
import { useStress } from '../context/StressContext';

const StressAnalysis: React.FC<{ mode: 'stress' | 'good' }> = ({ mode }) => {
  const { todayEvents, todayGoodThings } = useStress();

  const getAnalysis = () => {
    if (mode === 'stress') {
      const stats = {
        high: todayEvents.filter(e => e.level === 'high').length,
        medium: todayEvents.filter(e => e.level === 'medium').length,
        low: todayEvents.filter(e => e.level === 'low').length
      };

      const total = stats.high + stats.medium + stats.low;
      if (total === 0) {
        return {
          level: 'healthy',
          title: '健康状態：良好',
          message: 'まだ今日のストレス記録がありません。',
          icon: Leaf,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          border: 'border-emerald-200'
        };
      }

      if (stats.high >= 3 || (stats.high >= 2 && stats.medium >= 3)) {
        return {
          level: 'severe',
          title: '健康状態：要注意',
          message: '休息を取ることをお勧めします。',
          icon: AlertCircle,
          color: 'text-rose-600',
          bg: 'bg-rose-50',
          border: 'border-rose-200'
        };
      } else if (stats.high >= 2 || stats.medium >= 4) {
        return {
          level: 'moderate',
          title: '健康状態：やや疲れ気味',
          message: '深呼吸や軽い運動を試してみましょう。',
          icon: AlertCircle,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          border: 'border-amber-200'
        };
      } else if (stats.high >= 1 || stats.medium >= 2 || stats.low >= 3) {
        return {
          level: 'mild',
          title: '健康状態：普通',
          message: '早めの気分転換を。',
          icon: Leaf,
          color: 'text-sky-600',
          bg: 'bg-sky-50',
          border: 'border-sky-200'
        };
      } else {
        return {
          level: 'healthy',
          title: '健康状態：良好',
          message: 'この調子を維持しましょう。',
          icon: Leaf,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          border: 'border-emerald-200'
        };
      }
    } else {
      const stats = {
        big: todayGoodThings.filter(e => e.level === 'big').length,
        medium: todayGoodThings.filter(e => e.level === 'medium').length,
        small: todayGoodThings.filter(e => e.level === 'small').length
      };

      const total = stats.big + stats.medium + stats.small;
      if (total === 0) {
        return {
          level: 'normal',
          title: '今日の良いこと',
          message: 'まだ記録がありません。',
          icon: Leaf,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200'
        };
      }

      if (stats.big >= 2 || (stats.big >= 1 && stats.medium >= 2)) {
        return {
          level: 'excellent',
          title: '素晴らしい一日！',
          message: '大きな良いことがたくさんありましたね。',
          icon: Leaf,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          border: 'border-emerald-200'
        };
      } else if (stats.big >= 1 || stats.medium >= 3) {
        return {
          level: 'great',
          title: '頑張っています！',
          message: '意味のある良いことを見つけられています。',
          icon: Leaf,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200'
        };
      } else {
        return {
          level: 'good',
          title: '良い調子です',
          message: '小さな良いことも大切にできていますね。',
          icon: Leaf,
          color: 'text-sky-600',
          bg: 'bg-sky-50',
          border: 'border-sky-200'
        };
      }
    }
  };

  const analysis = getAnalysis();
  const Icon = analysis.icon;

  return (
    <div className={`rounded-xl border ${analysis.border} ${analysis.bg} p-2.5 mb-2`}>
      <div className="flex items-center gap-1.5">
        <div className={`p-1 rounded-full ${analysis.bg} ${analysis.color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <h3 className={`text-xs font-medium ${analysis.color}`}>{analysis.title}</h3>
      </div>
      <p className={`${analysis.color} text-2xs mt-1 opacity-90`}>{analysis.message}</p>
    </div>
  );
};

export default StressAnalysis;