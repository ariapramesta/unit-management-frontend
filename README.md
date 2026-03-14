# Unit Management Frontend

A modern web application for managing units (capsules and cabins) with real-time status tracking and comprehensive CRUD operations.

## 🚀 Features

- **Unit Management**: Create, read, update, and delete units
- **Status Tracking**: Monitor unit status (available, occupied, cleaning, maintenance)
- **Type Filtering**: Filter units by type (capsule or cabin)
- **Status Filtering**: Filter units by current status
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Instant UI updates after CRUD operations
- **Modal Interactions**: Intuitive modals for creating and viewing unit details

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **UI**: Custom components with modern design

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your API URL in `.env.local`:

   ```
   NEXT_PUBLIC_API_URL=http://your-api-server-url
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
unit-management-frontend/
├── app/                    # Next.js app router
│   ├── page.tsx           # Main dashboard page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── CreateUnitModal.tsx    # Modal for creating units
│   ├── DashboardHeader.tsx    # Header with filters and add button
│   ├── UnitDetailModal.tsx    # Modal for viewing unit details
│   └── UnitTable.tsx          # Table displaying units
├── service/               # API services
│   ├── api.ts             # Axios configuration
│   └── unitService.ts     # Unit-related API calls
├── types/                 # TypeScript type definitions
│   └── unit.ts            # Unit type definitions
├── constants/             # Application constants
├── public/                # Static assets
└── styles/                # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📊 Data Models

### Unit

```typescript
type UnitData = {
  id: string;
  name: string;
  type: "capsule" | "cabin";
  status: "available" | "occupied" | "cleaning" | "maintenance";
  lastUpdated?: string;
};
```

### Unit Types

- **capsule**: Individual sleeping units
- **cabin**: Larger accommodation units

### Unit Statuses

- **available**: Ready for use
- **occupied**: Currently in use
- **cleaning**: Being cleaned/maintained
- **maintenance**: Under repair or maintenance

## 🎨 UI Components

- **DashboardHeader**: Contains filters and add unit button
- **UnitTable**: Displays units with sorting and filtering
- **CreateUnitModal**: Form for creating new units
- **UnitDetailModal**: Shows detailed unit information with actions

## 🔗 API Integration

The application connects to a backend API for unit management operations. Configure the API URL in your environment variables:

```
NEXT_PUBLIC_API_URL=http://your-api-server-url
```

### API Endpoints Used

- `GET /units` - Fetch all units (with optional status filter)
- `POST /units` - Create a new unit
- `PUT /units/:id` - Update unit status
- `DELETE /units/:id` - Delete a unit
