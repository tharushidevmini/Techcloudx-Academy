-- ==============================================================================
-- TechCloudX Academy - Migration 003: Azure Certification Courses & Batches Seed
-- Courses: AZ-900, AZ-104, AZ-700
-- ==============================================================================

-- 1. Insert Azure Certification Courses
INSERT INTO courses (
    id,
    title,
    slug,
    certification_code,
    category,
    description,
    price_cents,
    price_usd,
    price_lkr,
    level,
    duration,
    badge_text,
    technologies,
    syllabus,
    is_published
) VALUES 
(
    'a0000000-0000-0000-0000-000000000900',
    'Microsoft Azure Fundamentals (AZ-900)',
    'az-900-azure-fundamentals',
    'AZ-900',
    'Azure Cloud',
    'Master foundational cloud concepts, Azure architectural components, core compute and storage solutions, Entra ID identity management, governance compliance, and cost optimization. Prepares you thoroughly for the official Microsoft AZ-900 certification exam.',
    12000,
    120,
    35000,
    'beginner',
    '4 Weeks (32 Hours)',
    'Official Microsoft Exam Prep',
    '["Azure Portal", "Azure CLI", "Compute & Storage", "Entra ID", "Resource Manager", "Azure Monitor", "Cost Management"]'::jsonb,
    '[
        {
            "module_number": 1,
            "title": "Cloud Concepts & Azure Core Architecture",
            "topics": [
                "Introduction to Cloud Computing (IaaS, PaaS, SaaS)",
                "Azure Geographic Architecture: Regions, Availability Zones, and Sovereign Clouds",
                "Azure Resource Manager (ARM), Subscriptions, and Management Groups"
            ],
            "lab": "Deploying first multi-tier resources using Azure Portal and Azure Cloud Shell"
        },
        {
            "module_number": 2,
            "title": "Azure Core Compute, Networking & Storage",
            "topics": [
                "Virtual Machines, App Services, Container Instances (ACI), and Azure Functions",
                "Virtual Networks (VNets), Subnets, VPN Gateways, and ExpressRoute overview",
                "Azure Storage: Blob tiers, Azure Files, redundancy options (LRS, GRS, ZRS)"
            ],
            "lab": "Configuring secure static website hosting and VNet peering"
        },
        {
            "module_number": 3,
            "title": "Azure Identity, Access & Governance",
            "topics": [
                "Microsoft Entra ID (formerly Azure AD), Tenants, Users and Groups",
                "Role-Based Access Control (RBAC) and Least Privilege Security",
                "Azure Policy, Resource Locks, and Microsoft Defender for Cloud"
            ],
            "lab": "Enforcing organizational compliance policies and conditional access guardrails"
        },
        {
            "module_number": 4,
            "title": "Cost Management & Certification Masterclass",
            "topics": [
                "Total Cost of Ownership (TCO) Calculator and Azure Pricing Calculator",
                "Budgets, Cost Alerts, and Azure Advisor Optimization Recommendations",
                "Comprehensive AZ-900 Mock Exam Review and Question Breakdown"
            ],
            "lab": "Setting up cost alert automations and full mock test walkthrough"
        }
    ]'::jsonb,
    true
),
(
    'a0000000-0000-0000-0000-000000000104',
    'Microsoft Azure Administrator Associate (AZ-104)',
    'az-104-azure-administrator',
    'AZ-104',
    'Infrastructure & SysOps',
    'The gold-standard certification for cloud engineers. Hands-on enterprise mastery of Azure identities, governance policies, secure hybrid storage, high-availability compute deployments, Virtual Network topologies, and continuous resource observability.',
    22000,
    220,
    65000,
    'intermediate',
    '8 Weeks (64 Hours)',
    'Top In-Demand Role Track',
    '["Virtual Networks", "Azure VMs", "Kubernetes (AKS)", "ARM & Bicep", "Entra ID", "Log Analytics", "Terraform", "Backup & DR"]'::jsonb,
    '[
        {
            "module_number": 1,
            "title": "Manage Azure Identities and Governance",
            "topics": [
                "Managing Microsoft Entra ID identities, hybrid identity synchronization",
                "Configuring Privileged Identity Management (PIM) and Access Reviews",
                "Custom RBAC roles, Azure Policy definitions, and Management Group hierarchies"
            ],
            "lab": "Configuring self-service password reset and automated PIM role activations"
        },
        {
            "module_number": 2,
            "title": "Implement and Manage Secure Cloud Storage",
            "topics": [
                "Azure Storage Accounts: Security keys, SAS tokens, and Azure Storage Firewalls",
                "Configuring Azure Files, Azure File Sync, and NFS/SMB shares",
                "Lifecycle management rules, soft delete, and immutability policies"
            ],
            "lab": "Creating private endpoint storage accounts with automated lifecycle archiving"
        },
        {
            "module_number": 3,
            "title": "Deploy and Manage Azure Compute Resources",
            "topics": [
                "Virtual Machine sizing, availability sets, and VM Scale Sets (VMSS)",
                "Azure Container Instances (ACI) and production Azure Kubernetes Service (AKS)",
                "Azure App Services, deployment slots, custom domains, and SSL certificates"
            ],
            "lab": "Deploying an auto-scaling VMSS with blue-green App Service deployment slots"
        },
        {
            "module_number": 4,
            "title": "Configure and Manage Virtual Networking",
            "topics": [
                "Virtual Networks, IP addressing, Network Security Groups (NSGs), and ASGs",
                "VNet peering, Azure Bastion, VPN Gateway, and User Defined Routes (UDR)",
                "Azure Load Balancer, Application Gateway (Layer 7), and DNS resolution"
            ],
            "lab": "Architecting a hub-and-spoke VNet topology with centralized firewall routing"
        },
        {
            "module_number": 5,
            "title": "Monitor, Backup, and Maintain Azure Resources",
            "topics": [
                "Azure Monitor metrics, alerts, and Log Analytics KQL queries",
                "Azure Backup vaults, recovery services, and VM disaster recovery (ASR)",
                "Automating infrastructure deployment with Terraform and Bicep"
            ],
            "lab": "Writing complex Kusto (KQL) queries and automating backup disaster recovery drills"
        }
    ]'::jsonb,
    true
),
(
    'a0000000-0000-0000-0000-000000000700',
    'Designing and Implementing Microsoft Azure Networking Solutions (AZ-700)',
    'az-700-azure-network-engineer',
    'AZ-700',
    'Cloud Networking & Security',
    'Master advanced enterprise cloud networking, multi-region hybrid connectivity, Virtual WAN architectures, Application Gateway v2 with WAF, Azure Front Door, Private Link ecosystems, and zero-trust perimeter network security.',
    26000,
    260,
    75000,
    'advanced',
    '6 Weeks (48 Hours)',
    'Advanced Specialist Track',
    '["Azure Virtual WAN", "ExpressRoute", "Application Gateway WAF", "Azure Firewall", "Private Link", "Network Watcher", "Traffic Analytics"]'::jsonb,
    '[
        {
            "module_number": 1,
            "title": "Design and Implement Core Enterprise Networking Infrastructure",
            "topics": [
                "Enterprise IP addressing schemas, CIDR planning, and Azure Private DNS Zones",
                "Custom routing with User Defined Routes (UDR), BGP route propagation",
                "Multi-region Virtual Network peering and global connectivity topologies"
            ],
            "lab": "Building a resilient multi-region mesh network with cross-subscription VNet peering"
        },
        {
            "module_number": 2,
            "title": "Design and Implement Hybrid Networking Solutions",
            "topics": [
                "Site-to-Site (S2S) and Point-to-Site (P2S) VPN Gateway with BGP routing",
                "Azure ExpressRoute architecture, circuits, peering, and FastPath",
                "Global Azure Virtual WAN (vWAN) with secured virtual hubs"
            ],
            "lab": "Simulating on-premises to Azure hybrid failover via redundant VPN and ExpressRoute"
        },
        {
            "module_number": 3,
            "title": "Design and Implement Routing, Load Balancing & Acceleration",
            "topics": [
                "Azure Load Balancer (Public & Internal) with health probes and outbound rules",
                "Application Gateway v2 with Web Application Firewall (WAF) and SSL offloading",
                "Azure Front Door (AFD) global load balancing, caching, and CDN optimization"
            ],
            "lab": "Deploying zero-downtime Application Gateway with custom OWASP WAF rules"
        },
        {
            "module_number": 4,
            "title": "Secure and Monitor Enterprise Azure Networks",
            "topics": [
                "Azure Firewall Premium with TLS inspection and IDPS intrusion detection",
                "Azure DDoS Protection Standard, Network Security Perimeters",
                "Azure Network Watcher, Connection Monitor, Flow Logs, and Traffic Analytics"
            ],
            "lab": "Implementing end-to-end zero-trust network segmentation and Traffic Analytics dashboard"
        },
        {
            "module_number": 5,
            "title": "Design and Implement Private Access to Azure PaaS Services",
            "topics": [
                "Azure Private Link and Private Endpoints for multi-tenant PaaS services",
                "Service Endpoints vs Private Endpoints trade-offs and enterprise architecture",
                "Comprehensive AZ-700 Case Studies and High-Availability Network Design Review"
            ],
            "lab": "Locking down SQL, KeyVault, and Storage with Private Link and Private DNS integration"
        }
    ]'::jsonb,
    true
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    certification_code = EXCLUDED.certification_code,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    price_cents = EXCLUDED.price_cents,
    price_usd = EXCLUDED.price_usd,
    price_lkr = EXCLUDED.price_lkr,
    level = EXCLUDED.level,
    duration = EXCLUDED.duration,
    badge_text = EXCLUDED.badge_text,
    technologies = EXCLUDED.technologies,
    syllabus = EXCLUDED.syllabus,
    is_published = EXCLUDED.is_published,
    updated_at = CURRENT_TIMESTAMP;

-- 2. Insert Active Cohort Batches with Schedules & Seat Limits
INSERT INTO batches (
    id,
    course_id,
    batch_code,
    start_date,
    end_date,
    schedule,
    max_capacity,
    enrolled_count,
    meeting_link,
    status
) VALUES
-- AZ-900 Batches
(
    'b0000000-0000-0000-0000-000000000901',
    'a0000000-0000-0000-0000-000000000900',
    'AZ900-2026-B1',
    '2026-11-14',
    '2026-12-12',
    'Saturdays & Sundays | 09:00 AM - 01:00 PM IST',
    25,
    18,
    'https://meet.techcloudx.academy/az900-b1',
    'upcoming'
),
(
    'b0000000-0000-0000-0000-000000000902',
    'a0000000-0000-0000-0000-000000000900',
    'AZ900-2026-B2',
    '2026-12-05',
    '2027-01-09',
    'Tuesdays & Thursdays | 07:00 PM - 09:30 PM IST',
    20,
    6,
    'https://meet.techcloudx.academy/az900-b2',
    'upcoming'
),
-- AZ-104 Batches
(
    'b0000000-0000-0000-0000-000000000105',
    'a0000000-0000-0000-0000-000000000104',
    'AZ104-2026-B1',
    '2026-11-21',
    '2027-01-16',
    'Saturdays & Sundays | 02:00 PM - 06:00 PM IST',
    20,
    15,
    'https://meet.techcloudx.academy/az104-b1',
    'upcoming'
),
(
    'b0000000-0000-0000-0000-000000000106',
    'a0000000-0000-0000-0000-000000000104',
    'AZ104-2026-B2',
    '2026-12-15',
    '2027-02-09',
    'Mon, Wed & Fri | 07:30 PM - 09:30 PM IST',
    20,
    9,
    'https://meet.techcloudx.academy/az104-b2',
    'upcoming'
),
-- AZ-700 Batches
(
    'b0000000-0000-0000-0000-000000000701',
    'a0000000-0000-0000-0000-000000000700',
    'AZ700-2026-B1',
    '2026-11-28',
    '2027-01-09',
    'Saturdays & Sundays | 06:30 PM - 10:00 PM IST',
    15,
    12,
    'https://meet.techcloudx.academy/az700-b1',
    'upcoming'
),
(
    'b0000000-0000-0000-0000-000000000702',
    'a0000000-0000-0000-0000-000000000700',
    'AZ700-2026-B2',
    '2026-12-19',
    '2027-01-30',
    'Mon, Wed & Fri | 07:00 PM - 09:30 PM IST',
    15,
    4,
    'https://meet.techcloudx.academy/az700-b2',
    'upcoming'
)
ON CONFLICT (batch_code) DO UPDATE SET
    start_date = EXCLUDED.start_date,
    end_date = EXCLUDED.end_date,
    schedule = EXCLUDED.schedule,
    max_capacity = EXCLUDED.max_capacity,
    enrolled_count = EXCLUDED.enrolled_count,
    meeting_link = EXCLUDED.meeting_link,
    status = EXCLUDED.status,
    updated_at = CURRENT_TIMESTAMP;
