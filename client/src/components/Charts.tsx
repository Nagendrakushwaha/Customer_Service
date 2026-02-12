import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const FINANCIAL_DATA = [
  { year: '2025', revenue: 15, cost: 25 },
  { year: '2026', revenue: 60, cost: 40 },
  { year: '2027', revenue: 180, cost: 70 },
];

const MARKET_DATA = [
  { name: 'Serviceable Market', value: 6000000 },
  { name: 'Target Market', value: 2500000 },
];

const FUNDING_DATA = [
  { name: 'Product Dev', value: 40 },
  { name: 'Sales & Marketing', value: 30 },
  { name: 'Operations', value: 20 },
  { name: 'Legal/Misc', value: 10 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export function FinancialChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={FINANCIAL_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="year" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRev)" name="Revenue (Lakhs)" />
          <Area type="monotone" dataKey="cost" stroke="#ef4444" fillOpacity={1} fill="url(#colorCost)" name="Cost (Lakhs)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FundingPieChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={FUNDING_DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {FUNDING_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
