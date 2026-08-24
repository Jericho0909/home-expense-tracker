import {
    Zap,
    Droplet,
    Wifi,
    Smartphone,
    GlassWater,
    Flame,
    ShoppingCart,
    Beef,
    Fish,
    LeafyGreen,
    Apple,
    Cookie,
    CupSoda,
    BrushCleaning,
    CookingPot,
    Bubbles,
    House,
    Bath,
    Fuel,
    Bus,
    Car,
    CircleParking,
    PhilippinePeso,
    Wrench,
    Pill,
    Stethoscope,
    Smile,
    FlaskConical,
    HeartPulse,
    Settings,
    GraduationCap,
    Wallet,
    Clapperboard,
    PartyPopper,
    UserRound,
    HandHeart,
    CreditCard,
    Landmark,
    Ticket,
    Receipt,
    BriefcaseBusiness,
    CircleCheck,
    CircleAlert,
    CircleX,
    Sparkles,
    Bug,
    MoreHorizontal,
} from "lucide-react";

import type {
    UtilitiesNames,
    FoodAndHouseHoldCategory,
    TransportationCategory,
    HealthCategory,
    HouseMaintenanceCategory,
    FamilyExpensesCategory,
    OtherExpenseCategory,
    StatusType,
    IconType,
    FamilyRole
} from "@/app/type/model";

export const UtilityBillIcons: Record<UtilitiesNames, IconType> = {
    Electricity: {
        icon: <Zap size={16} color="black" fill="yellow" />,
    },
    Water: {
        icon: <Droplet size={16} color="black" fill="blue" />,
    },
    Internet: {
        icon: <Wifi size={16} color="black" fill="white" />,
    },
    MobileLoad: {
        icon: <Smartphone size={16} color="black" fill="gray" />,
    },
    MineralWater: {
        icon: <GlassWater size={16} color="black" fill="blue" />,
    },
    CookingGas: {
        icon: <Flame size={16} color="black" fill="red" />,
    }
}

export const FoodAndHousholdBillIcons: Record<FoodAndHouseHoldCategory, IconType> = {
    Groceries: {
        icon: <ShoppingCart size={16} color="black" fill="gray" />,
    },
    Meat: {
        icon: <Beef size={16} color="black" fill="#A65D57" />,
    },
    Seafood: {
        icon: <Fish size={16} color="black" fill="white" />,
    },
    Fruits: {
        icon: <Apple size={16} color="black" fill="red" />,
    },
    Vegetables: {
        icon: <LeafyGreen size={16} color="black" fill="green" />,
    },
    Snacks: {
        icon: <Cookie size={16} color="black" fill="#A67C52" />,
    },
    Beverages: {
        icon: <CupSoda size={16} color="black" fill="#5F8C8C" />,
    },
    Cleaning: {
        icon: <BrushCleaning size={16} color="black" fill="#6B8E6B" />,
    },
    Laundry: {
        icon: <Bubbles size={16} color="black" fill="blue" />,
    },
    PersonalCare: {
        icon: <Bath size={16} color="black" fill="#B98282" />,
    },
    Kitchen: {
        icon: <CookingPot size={16} color="black" fill="#B86F52" />,
    },
    HomeSupplies: {
        icon: <House size={16} color="black" fill="brown" />,
    },
}

export const TransportationBillIcons: Record<TransportationCategory, IconType> = {
    Fuel: {
        icon: <Fuel size={16} color="black" fill="#D97706" />,
    },
    PublicTransport: {
        icon: <Bus size={16} color="black" fill="#2563EB" />,
    },
    RideHailing: {
        icon: <Car size={16} color="black" fill="red" />,
    },
    Parking: {
        icon: <CircleParking size={16} color="black" fill="yellow" />,
    },
    Toll: {
        icon: <PhilippinePeso  size={16} color="black" fill="#16A34A" />,
    },
    VehicleMaintenance: {
        icon: <Wrench size={16} color="black" fill="#78716C" />,
    },
}

export const HealthBillIcons: Record<HealthCategory, IconType> = {
    Medicine: {
        icon: <Pill size={16} color="black" fill="pink" />,
    },
    Consultation: {
        icon: <Stethoscope size={16} color="black" fill="gray" />,
    },
    Dental: {
        icon: <Smile size={16} color="black" fill="white" />,
    },
    Laboratory: {
        icon: <FlaskConical size={16} color="black" fill="#16A34A" />,
    },
    Other: {
        icon: <HeartPulse  size={16} color="black" fill="#DC2626" />,
    },
}

export const HouseMaintenanceBillIcons: Record<HouseMaintenanceCategory, IconType> = {
    Repairs: {
        icon: <Wrench size={16} color="black" fill="#6B7280" />,
    },
    Maintenance: {
        icon: <Settings size={16} color="black" fill="#6B7280" />,
    },
    Cleaning: {
        icon: <Sparkles size={16} color="#0891B2" />,
    },
    PestControl: {
        icon: <Bug size={16} color="#16A34A" />,
    },
    Other: {
        icon: <MoreHorizontal size={16} color="#78716C" />,
    },
    
}

export const FamilyExpensesBillIcons: Record<FamilyExpensesCategory, IconType> = {
   Education: {
        icon: <GraduationCap size={16} color="#333" />,
    },
    Allowance: {
        icon: <Wallet size={16} color="#8A6A3D" />,
    },
    Entertainment: {
        icon: <Clapperboard size={16} color="#6B5B73" />,
    },
    Celebrations: {
        icon: <PartyPopper size={16} color="#A65D57" />,
    },
    Other: {
        icon: <MoreHorizontal size={16} color="#78716C" />,
    },
}

export const OtherExpensesBillIcons: Record<OtherExpenseCategory, IconType> = {
    Personal: {
        icon: <UserRound size={16} color="#8B6F47" />,
    },
    Donations: {
        icon: <HandHeart size={16} color="#A65D57" />,
    },
    Subscriptions: {
        icon: <CreditCard size={16} color="#5F6B73" />,
    },
    Government: {
        icon: <Landmark size={16} color="#4F5D4F" />,
    },
    Miscellaneous: {
        icon: <MoreHorizontal size={16} color="#78716C" />,
    },
    Tickets: {
        icon: <Ticket size={16} color="#7A5C61" />,
    },
    Fees: {
        icon: <Receipt size={16} color="#806A4A" />,
    },
    Services: {
        icon: <BriefcaseBusiness size={16} color="#5E6B62" />,
    },
};

export const StatusColor: Record<StatusType, string> = {
    Paid: "#6B8E6B",
    Pending: "#C49A5A",
    Overdue: "#A65D57",
    Unpaid: "#8B6F47",
};

export const StatusIcons: Record<StatusType, IconType> = {
    Paid: {
        icon: <CircleCheck size={16} color="black" fill="#6B8E6B" />,
    },
    Pending: {
        icon: <CircleAlert size={16} color="black" fill="#C49A5A" />,
    },
    Overdue: {
        icon: <CircleX size={16} color="black" fill="#A65D57" />,
    },
    Unpaid: {
        icon: <CircleAlert size={16} color="black" fill="#8B6F47" />,
    },
};

export const FamilyRoleColor: Record<FamilyRole, string> = {
    Father: "#2563EB",
    Mother: "#DB2777",
    Son: "#0284C7",
    Daughter: "#E11D48",
    Grandfather: "#D97706",
    Grandmother: "#7E22CE",
    Uncle: "#16A34A",
    Aunt: "#C026D3",
    Other: "#6B7280",
};