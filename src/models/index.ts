/* eslint-disable camelcase */

// #region [Redux]

export interface AwsCredential {
  id: number
  modified_date: Date
  created_date: Date
  user?: any
  user_id: number
  description: string
  is_active: boolean
  access_key: string
}

export interface UserInterface {
  id?: number
  created_at?: Date
  email?: string
  password?: string
  last_login_date?: Date
  test?: boolean
  authorized: boolean
  loading: boolean
  aws_credentials?: AwsCredential
  aws_region?: string
  ipAddress?: string
}

export interface StringInterface {
  [x: string]: string
}

export interface AnyInterface {
  [x: string]: any
}

export type Locale = 'mn-MN' 

export interface SettingsInterface {
  isMobileView?: boolean
  isMobileMenuOpen?: boolean
  isLightTheme?: boolean
  isSettingsOpen?: boolean
  isMenuTop?: boolean
  isMenuCollapsed?: boolean
  isBorderless?: boolean
  isSquaredBorders?: boolean
  isFixedWidth?: boolean
  isMenuShadow?: boolean
  locale: Locale
  [x: string]: any
}

export interface ReduxInterface {
  UserReducer: UserInterface
  SettingsReducer: SettingsInterface
}
// #endregion

// #region [Response]
export interface BaseResponse {
  status_code: number
  error_msg: string
  body: any
}
// #endregion

// #region [Prometheus]
export type PtmStatus = 'success' | 'error'
export type PtmResultType = 'matrix' | 'vector' | 'scalar' | 'string'
export interface PtmMetric {
  [x: string]: string
}

export type PtmValue = [number, string]

export interface PtmRangeVectors {
  metric: PtmMetric
  values: PtmValue[]
}

export interface PtmInstantVectors {
  metric: PtmMetric
  value: PtmValue
}

export interface PtmData<T> {
  resultType: PtmResultType
  result: T[]
}
export interface PtmBaseResponse<T> {
  status: PtmStatus
  error?: string
  data?: PtmData<T>
}

export interface PtmChartLegend {
  bottom: string
  left: string
}

export interface PtmChartDataValue {
  x: string
  y: number
}

export interface PtmChartData {
  id: string
  color: string
  data: PtmChartDataValue[]
}
// #endregion

// #region [Menu]
export interface MenuAction {
  key?: string
  name: React.ReactNode
  disabled?: boolean
  icon: React.ReactNode
  action?: Function
}
// #endregion

// #region [Compute]
// #region [Instance]
export type InstanceStatus =
  | 'SHUTOFF'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'BUILD'
  | 'REBOOT'
  | 'HARD_REBOOT'
  | 'VERIFY_RESIZE'
  | 'REVERT_RESIZE'
  | 'ERROR'
  | 'STARTING'
  | 'STOPING'
  | 'DELETING'
  | 'SUSPENDING'
  | 'RESUMING'
  | 'RESIZE'

export type InstanceAction =
  | 'Soft Reboot'
  | 'Hard Reboot'
  | 'Start'
  | 'Resume'
  | 'Stop'
  | 'Suspend'
  | 'Resize'
  | 'On WAF'
  | 'Off WAF'

export interface RemoteConnectionResponse {
  protocol: string
  type: string
  url: string
}

export interface Link {
  href: string
  rel: string
}

export interface PublicAddress {
  addr: string
  version: number
  'OS-EXT-IPS:type': string
  'OS-EXT-IPS-MAC:mac_addr': string
}

export interface InstanceAddresses {
  [x: string]: PublicAddress[]
}

export interface InstanceSecurityGroup {
  name: string
}

export interface OsExtendedVolumesVolumesAttached {
  id: string
}

export interface InstanceFault {
  code: number
  created: Date
  details: string
  message: string
}

export interface Instance {
  id: string
  tenant_id: string
  user_id: string
  name: string
  updated: Date
  created: Date
  hostid: string
  status: InstanceStatus
  progress: number
  accessIPv4: string
  accessIPv6: string
  has_waf: boolean
  waf_addresses: InstanceAddresses
  flavor: InstanceFlavor
  addresses: InstanceAddresses
  metadata: Metadata
  links: Link[]
  key_name: string
  adminPass: string
  security_groups: InstanceSecurityGroup[]
  fault: InstanceFault
  tags?: AnyInterface[]
  volumes?: Volume[]
}

export interface Metadata {
  [x: string]: string
}

export interface Location {
  metadata?: Metadata
  url: string
}

export interface Properties {
  hw_disk_bus: string
  hw_qemu_guest_agent: string
  hw_scsi_model: string
  locations: Location[]
  os_hash_algo: string
  os_hash_value: string
  os_hidden: boolean
  os_require_quiesce: string
}

export interface ImageListResponse {
  privateImages?: Image[]
  publicImages?: Image[]
}

export interface Flavor {
  id: string
  disk: number
  ram: number
  name: string
  rxtx_factor: number
  vcpus: number
}

export interface Network {
  id: string
  name: string
  description: string
  admin_state_up: boolean
  status: string
  subnets: string[]
  tenant_id: string
  project_id: string
  shared: boolean
  availability_zone_hints: any[]
  tags: AnyInterface[]
  created_at: Date
  updated_at: Date
}

export interface Subnet {
  id: string
  network_id: string
  name: string
  description: string
  ip_version: number
  cidr: string
  gateway_ip: string
  dns_nameservers: any[]
  allocation_pools: AllocationPool[]
  host_routes: any[]
  enable_dhcp: boolean
  tenant_id: string
  project_id: string
  ipv6_address_mode: string
  ipv6_ra_mode: string
  subnetpool_id: string
  tags: any[]
}

export interface Router {
  status: string
  external_gateway_info: ExternalGatewayInfo
  admin_state_up: boolean
  distributed: boolean
  name: string
  description: string
  id: string
  tenant_id: string
  project_id: string
  routes: any[]
  availability_zone_hints: any[]
  tags: any[]
  created_at: Date
  updated_at: Date
}

export interface ExternalGatewayInfo {
  network_id: string
  enable_snat: boolean
  external_fixed_ips: ExternalFixedIp[]
}

export interface ExternalFixedIp {
  ip_address: string
  subnet_id: string
}

export interface Interface {
  id: string
  network_id: string
  name: string
  description: string
  admin_state_up: boolean
  status: string
  mac_address: string
  fixed_ips: FixedIp[]
  tenant_id: string
  project_id: string
  device_owner: string
  security_groups: SecurityGroup[]
  device_id: string
  allowed_address_pairs: any[]
  tags: string[]
  'binding:host_id': string
  'binding:vif_details'?: any
  'binding:vif_type': string
  'binding:vnic_type': string
  'binding:profile'?: any
}

export interface InstanceInterfaceFixedIp {
  subnet_id: string
  ip_address: string
}

export interface InstanceInterface {
  port_state: string
  fixed_ips: InstanceInterfaceFixedIp[]
  port_id: string
  net_id: string
  mac_addr: string
}

export interface Port {
  id: string
  network_id: string
  name: string
  description: string
  admin_state_up: boolean
  status: string
  mac_address: string
  fixed_ips: FixedIp[]
  tenant_id: string
  project_id: string
  device_owner: string
  security_groups: any[]
  device_id: string
  allowed_address_pairs: any[]
  tags: any[]
  'binding:host_id'?: string
  'binding:vif_details'?: any
  'binding:vif_type'?: string
  'binding:vnic_type'?: string
  'binding:profile'?: any
}

export interface FixedIp {
  subnet_id: string
  ip_address: string
}

export interface AllocationPool {
  start: string
  end: string
}

export interface AvailabilityZone {
  hosts?: any
  zoneName: string
  zoneState: { available: boolean }
}
// #endregion

// #region [Image]
export interface Image {
  id: string
  name: string
  status: string
  tags: AnyInterface[]
  container_format: string
  disk_format: string
  min_disk: number
  min_ram: number
  owner: string
  protected: boolean
  visibility: string
  checksum: string
  metadata?: any
  Properties: Properties
  created_at: Date
  updated_at: Date
  file: string
  schema: string
  virtual_size: number
}

export interface ImageServiceDiskFormat {
  key: string
  value: string
}

export interface ImageServiceData {
  container_formats: string[]
  disk_formats: ImageServiceDiskFormat[]
  visible: string[]
}
// #endregion

// #region [Key pair]
export interface KeyPair {
  name: string
  private_key?: string
  public_key?: string
  fingerprint: string
  user_id?: string
}
// #endregion

// #region [Flavor]
export interface InstanceFlavor {
  cpu: number
  id: string
  links: Link[]
  name: string
  ram: number
}
// #endregion
// #endregion

// #region [Storage]
// #region [Volume]
export interface VolumeAttachment {
  attachment_id: string
  device: string
  host_name: string
  id: string
  server_id: string
  volume_id: string
}

export interface VolumeImageMetadata {
  checksum: string
  container_format: string
  disk_format: string
  hw_disk_bus: string
  hw_qemu_guest_agent: string
  hw_scsi_model: string
  image_id: string
  image_name: string
  min_disk: string
  min_ram: string
  os_require_quiesce: string
  size: string
}

export interface Volume {
  id: string
  status: string
  size: number
  availability_zone: string
  attachments: VolumeAttachment[]
  name: string
  description: string
  volume_type: string
  snapshot_id: string
  source_volid: string
  backup_id?: any
  metadata: Metadata
  user_id: string
  bootable: string
  encrypted: boolean
  replication_status: string
  consistencygroup_id: string
  multiattach: boolean
  volume_image_metadata: VolumeImageMetadata
}
// #endregion

// #region [Snapshot]
export interface Snapshot {
  created_date: string
  description: string
  id: string
  metadata: Metadata
  name: string
  size: number
  status: string
  volume_id: string
}
// #endregion
// #endregion

// #region [Network]
// #region [Security group]
export type RuleDirection = 'ingress' | 'egress'

export type ProtocolName = 'tcp' | 'udp' | 'icmp'

export type ProtocolTempName =
  | 'tcp'
  | 'udp'
  | 'icmp'
  | 'all_icmp'
  | 'all_tcp'
  | 'all_udp'
  | 'dns'
  | 'http'
  | 'https'
  | 'imap'
  | 'imaps'
  | 'ldap'
  | 'ms_sql'
  | 'mysql'
  | 'pop3'
  | 'pop3s'
  | 'rdp'
  | 'smtp'
  | 'smtps'
  | 'ssh'

export interface Protocol {
  protocol: ProtocolName
  portRangeMin: number
  portRangeMax: number
}

export interface Rule {
  ID: string
  Direction: RuleDirection
  description: string
  ethertype: string
  security_group_id: string
  port_range_min: number
  port_range_max: number
  Protocol: string
  remote_group_id: string
  remote_ip_prefix: string
  tenant_id: string
  project_id: string
  CIDR: string
}

export interface SecurityGroup {
  ID: string
  name: string
  description: string
  rules: Rule[]
  tenant_id: string
}
// #endregion

// #region [Floating IP]
export interface FloatingIP {
  id: string
  description: string
  floating_network_id: string
  floating_ip_address: string
  port_id: string
  fixed_ip_address: string
  tenant_id: string
  project_id: string
  status: string
  router_id: string
  tags: AnyInterface[]
}
// #endregion

// #region [Load Balancer]
export interface Listener {
  id: string
  project_id: string
  name: string
  description: string
  protocol: string
  protocol_port: number
  default_pool_id: string
  loadbalancers?: LoadBalancer[]
  connection_limit: number
  sni_container_refs?: AnyInterface[]
  default_tls_container_ref: string
  admin_state_up: boolean
  pools?: Pool[]
  l7policies?: AnyInterface[]
  provisioning_status: string
  timeout_client_data: number
  timeout_member_data: number
  timeout_member_connect: number
  timeout_tcp_inspect: number
  insert_headers?: AnyInterface
  allowed_cidrs?: AnyInterface[]
}

export interface SessionPersistence {
  type: string
}

export interface Healthmonitor {
  id: string
  name: string
  project_id: string
  type: string
  delay: number
  timeout: number
  max_retries: number
  max_retries_down: number
  http_method: string
  url_path: string
  expected_codes: string
  admin_state_up: boolean
  status: string
  pools?: Pool[]
  provisioning_status: string
  operating_status: string
}

export interface PoolMember {
  name: string
  weight: number
  admin_state_up: boolean
  project_id: string
  subnet_id: string
  pool_id: string
  address: string
  protocol_port: number
  id: string
  provisioning_status: string
  operating_status: string
  backup: boolean
  monitor_address: string
  monitor_port: number
}

export interface Pool {
  lb_algorithm: string
  protocol: string
  description: string
  listeners?: Listener[]
  members?: PoolMember[]
  healthmonitor_id: string
  subnet_id: string
  project_id: string
  admin_state_up: boolean
  name: string
  id: string
  loadbalancers?: LoadBalancer[]
  session_persistence: SessionPersistence
  provider: string
  healthmonitor: Healthmonitor
  provisioning_status: string
  operating_status: string
}

export type ProvisioningStatus = 'ACTIVE' | 'ERROR' | 'PENDING_CREATE' | 'PENDING_UPDATE'

export type OperatingStatus = 'ONLINE' | 'OFFLINE' | 'ERROR'

export interface LoadBalancer {
  description: string
  admin_state_up: boolean
  project_id: string
  provisioning_status: ProvisioningStatus
  vip_address: string
  vip_port_id: string
  vip_subnet_id: string
  vip_network_id: string
  id: string
  operating_status: OperatingStatus
  name: string
  flavor_id: string
  provider: string
  listeners: Listener[]
  pools: Pool[]
  tags: AnyInterface[]
  created_at: Date
  updated_at: Date
}
// #endregion

// #region [Web Application Firewall]
export interface WebApplicationFirewall {
  id: number
  created_at: Date
  os_tenant_id: string
  name: string
  desc: string
  lb_id: string
  is_active: boolean
  lb_name: string
  lb_ip: string
  v_ip: string
}
// #endregion

// #endregion

// #region [Auth]
export interface UserProject {
  project_id: string
  project_name: string
  role_id: number
  role_name: string
}

export interface User {
  id: number
  created_at: Date
  firstname: string
  lastname: string
  phone: string
  email: string
  os_user_id: string
  os_tenant_id: string
  role: string
  is_active: boolean
  last_login_date: Date
  quota_plan: string
  projects?: UserProject[]
}

export interface ProjectMember {
  os_user_id: string
  name: string
  email: string
  role_id: number
}

export interface UserRole {
  id: number
  created_at: Date
  name: string
  Permissions?: UserPermission[]
}

export interface UserPermission {
  id: number
  created_at: Date
  entity: string
  api: string
  Roles?: any
}

export interface UserRoleExtra {
  description: string
  options: any
}

export interface UserQuotaset {
  id: number
  created_at: Date
  instances: number
  cpu: number
  ram: number
  keypair: number
  volume: number
  snapshot: number
  volume_size: number
  external_ip: number
  security_group: number
}
// #endregion

// #region [System]
export interface Endpoint {
  interface: string
  url: string
}

export interface Service {
  id: string
  name: string
  region: string
  type: string
  endpoints: Endpoint[]
}

export interface ComputeService {
  binary: string
  disabled_reason: string
  host: string
  state: string
  status: string
  zone: string
  updated_at: Date
}

export interface BlockStorageService {
  binary: string
  disabled_reason: string
  host: string
  state: string
  status: string
  zone: string
  frozen: boolean
  cluster: string
  replication_status: string
  active_backend_id: string
  updated_at: Date
}

export interface BridgeMappings {
  physnet1: string
}

export interface OvsCapabilities {
  datapath_types: string[]
  iface_types: string[]
}

export interface ResourceProviderBandwidths {}

export interface ResourceProviderHypervisors {
  'br-ex': string
}

export interface ResourceProviderInventoryDefaults {
  allocation_ratio: number
  min_unit: number
  reserved: number
  step_size: number
}

export interface Configurations {
  arp_responder_enabled: boolean
  baremetal_smartnic: boolean
  bridge_mappings: BridgeMappings
  datapath_type: string
  devices: number
  enable_distributed_routing: boolean
  extensions: any[]
  in_distributed_mode: boolean
  integration_bridge: string
  l2_population: boolean
  log_agent_heartbeats: boolean
  ovs_capabilities: OvsCapabilities
  ovs_hybrid_plug: boolean
  resource_provider_bandwidths: ResourceProviderBandwidths
  resource_provider_hypervisors: ResourceProviderHypervisors
  resource_provider_inventory_defaults: ResourceProviderInventoryDefaults
  tunnel_types: string[]
  tunneling_ip: string
  vhostuser_socket_dir: string
}

export interface NetworkAgent {
  id: string
  admin_state_up: boolean
  agent_type: string
  alive: boolean
  availability_zone: string
  binary: string
  configurations: Configurations
  description: string
  host: string
  topic: string
  heartbeat_timestamp: Date
}
// #endregion

// #region [Ics]
export interface IcsImageListResponse {
  [x: string]: Image
}

export interface IcsCredential {
  id: number
  created_at: Date
  credential_name: string
  is_active: boolean
  access_key: string
}

export interface IcsInstance {
  name: string
  address: string[]
  cpuUsage: number
  disk_gb: number[]
  ended_at: string
  fault: InstanceFault
  flavor: string
  instance_id: string
  memoryUsage: number
  memory_mb: number
  started_at: Date
  state: string
  tenant_id: string
  uptime: number
  vcpus: number
  volumes: IcsVolumeShort[]
  voucher: string
  zone: string
}

export interface IcsInstanceDetail {
  flavor: IcsInstanceFlavor
  secGroupList: any
  server: IcsServer
  vnc: IcsVnc
  volumeList: IcsVolume[]
}

export interface IcsServer {
  accessIPv4: string
  accessIPv6: string
  addresses: InstanceAddresses
  adminPass: string
  created: Date
  fault: string
  flavor: InstanceFlavor
  hostid: string
  id: string
  key_name: string
  links: Link[]
  metadata: any
  name: string
  'os-extended-volumes:volumes_attached': any[]
  progress: number
  security_groups: Name[]
  tags: any
  tenant_id: string
  updated: Date
  user_id: string
}

export interface Name {
  name: string
}

export interface IcsVnc {
  protocol: string
  type: string
  url: string
}

export interface IcsVolumeShort {
  device: string
  size: number
}

export interface IcsVolume {
  attachments: IcsVolumeAttachment[]
  availability_zone: string
  backup_id: any
  bootable: string
  consistencygroup_id: string
  description: string
  encrypted: boolean
  id: string
  metadata: IcsVolumeMetadata
  multiattach: boolean
  name: string
  replication_status: string
  size: number
  snapshot_id: string
  source_volid: string
  status: string
  user_id: string
  volume_image_metadata?: IcsVolumeImageMetadata
  volume_type?: string
}

export interface IcsVolumeImageMetadata {
  checksum: string
  container_format: string
  disk_format: string
  image_id: string
  image_name: string
  min_disk: string
  min_ram: string
  size: string
}

export interface IcsVolumeAttachment {
  attachment_id: string
  device: string
  host_name: string
  id: string
  server_id: string
  volume_id: string
}

export interface IcsVolumeMetadata {
  attached_mode: string
  readonly: string
}

export type IcsInstanceAction =
  | 'Soft Reboot'
  | 'Hard Reboot'
  | 'Stop'
  | 'Suspend'
  | 'Delete'
  | 'Resize'
  | 'Snapshot'
  | 'Resume'

export interface IcsKeyPair {
  fingerprint: string
  name: string
  private_key: string
  public_key: string
  user_id: string
}

// #region [Flavor]
export interface IcsInstanceFlavor {
  'OS-FLV-EXT-DATA:ephemeral': number
  disk: number
  id: string
  name: string
  'os-flavor-access:is_public': boolean
  ram: number
  rxtx_factor: number
  vcpus: number
}
// #endregion

// #region [Billing]
export interface IcsBillingDetail {
  current_amount: number
  forcast: number
  total_voucher: number
  alarms: IcsAlarm[]
}

export interface IcsAlarm {
  amount: number
  created_at: Date
  desc: string
  id: number
  is_send: boolean
  os_user_id: string
}
// #endregion

// #region [SecurityGroup]
export interface IcsSecurityGroups {
  [x: string]: IcsSecurityGroup
}

export interface IcsSecurityGroup {
  Ruls: IcsRole[]
  Secs: IcsSec
}

export interface IcsRole {
  Direction: string
  ID: string
  Protocol: string
  description: string
  ethertype: string
  port_range_max: number
  port_range_min: number
  project_id: string
  remote_group_id: string
  remote_ip_prefix: string
  security_group_id: string
  tenant_id: string
}

export interface IcsSec {
  description: string
  name: string
  tenant_id: string
  rules: IcsRuleShort
}

export interface IcsRuleShort {
  Group: IcsRuleShortGroup
  from_port: number
  ip_protocol: string
  ip_range: IcsRuleShortIpRange
  to_port: number
}

export interface IcsRuleShortGroup {
  Name: string
  tenant_id: string
}
export interface IcsRuleShortIpRange {
  CIDR: string
}
// #endregion
// #endregion

// #region [Aws]
// export interface AwsCredential {
//   id: number
//   created_at: Date
//   credential_name: string
//   is_active: boolean
//   access_key: string
// }

export interface AwsKeyPair {
  KeyFingerprint: string
  KeyName: string
  KeyPairId: string
  Tags?: any
}

export interface AwsIpRange {
  CidrIp: string
  Description?: any
}

export interface AwsIpPermission {
  FromPort: number
  IpProtocol: string
  IpRanges: AwsIpRange[]
  Ipv6Ranges?: any
  PrefixListIds?: any
  ToPort: number
  UserIdGroupPairs?: any
}

export interface AwsIpPermissionsEgress {
  FromPort?: any
  IpProtocol: string
  IpRanges: AwsIpRange[]
  Ipv6Ranges?: any
  PrefixListIds?: any
  ToPort?: any
  UserIdGroupPairs?: any
}

export interface AwsSecurityGroup {
  Description: string
  GroupId: string
  GroupName: string
  IpPermissions: AwsIpPermission[]
  IpPermissionsEgress: AwsIpPermissionsEgress[]
  OwnerId: string
  Tags?: any
  VpcId: string
}

export interface AwsEbs {
  AttachTime: Date
  DeleteOnTermination: boolean
  Status: string
  VolumeId: string
}

export interface AwsBlockDeviceMapping {
  DeviceName: string
  Ebs: AwsEbs
  NoDevice?: any
  VirtualName: string
}

export interface AwsCapacityReservationSpecification {
  CapacityReservationPreference: string
  CapacityReservationTarget?: any
}

export interface AwsCpuOptions {
  CoreCount: number
  ThreadsPerCore: number
}

export interface AwsHibernationOptions {
  Configured: boolean
}

export interface AwsMetadataOptions {
  HttpEndpoint: string
  HttpPutResponseHopLimit: number
  HttpTokens: string
  State: string
}

export interface AwsMonitoring {
  State: string
}

export interface AwsAttachment {
  AttachTime: Date
  AttachmentId: string
  DeleteOnTermination: boolean
  DeviceIndex: number
  Status: string
}

export interface AwsGroup {
  GroupId: string
  GroupName: string
}

export interface AwsPrivateIpAddress {
  Association?: any
  Primary: boolean
  PrivateDnsName: string
  PrivateIpAddress: string
}

export interface AwsNetworkInterface {
  Association?: any
  Attachment: AwsAttachment
  Description: string
  Groups: AwsGroup[]
  InterfaceType: string
  Ipv6Addresses?: any
  MacAddress: string
  NetworkInterfaceId: string
  OwnerId: string
  PrivateDnsName: string
  PrivateIpAddress: string
  PrivateIpAddresses: AwsPrivateIpAddress[]
  SourceDestCheck: boolean
  Status: string
  SubnetId: string
  VpcId: string
}

export interface AwsPlacement {
  Affinity?: any
  AvailabilityZone: string
  GroupName: string
  HostId?: any
  HostResourceGroupArn?: any
  PartitionNumber?: any
  SpreadDomain?: any
  Tenancy: string
}

export interface AwsState {
  Code: number
  Name: 'pending' | 'running' | 'shutting-down' | 'terminated' | 'stopping' | 'stopped'
}

export interface AwsStateReason {
  Code: string
  Message: string
}

export type AwsInstanceAction = 'Start' | 'Stop' | 'Reboot'

export interface AwsTag {
  Key: string
  Value: string
}

export interface AwsEbsInfo {
  EbsOptimizedSupport: string
  EncryptionSupport: string
}

export interface AwsMemoryInfo {
  SizeInMiB: number
}

export interface AwsNetworkInfo {
  EnaSupport: string
  Ipv4AddressesPerInterface: number
  Ipv6AddressesPerInterface: number
  Ipv6Supported: boolean
  MaximumNetworkInterfaces: number
  NetworkPerformance: string
}

export interface AwsPlacementGroupInfo {
  SupportedStrategies: string[]
}

export interface AwsProcessorInfo {
  SupportedArchitectures: string[]
  SustainedClockSpeedInGhz: number
}

export interface AwsVCpuInfo {
  DefaultCores: number
  DefaultThreadsPerCore: number
  DefaultVCpus: number
  ValidCores: number[]
  ValidThreadsPerCore: number[]
}

export interface AwsFlavor {
  AutoRecoverySupported: boolean
  BareMetal: boolean
  BurstablePerformanceSupported: boolean
  CurrentGeneration: boolean
  DedicatedHostsSupported: boolean
  EbsInfo: AwsEbsInfo
  FpgaInfo?: any
  FreeTierEligible: boolean
  GpuInfo?: any
  HibernationSupported: boolean
  Hypervisor: string
  InferenceAcceleratorInfo?: any
  InstanceStorageInfo?: any
  InstanceStorageSupported: boolean
  InstanceType: string
  MemoryInfo: AwsMemoryInfo
  NetworkInfo: AwsNetworkInfo
  PlacementGroupInfo: AwsPlacementGroupInfo
  ProcessorInfo: AwsProcessorInfo
  SupportedRootDeviceTypes: string[]
  SupportedUsageClasses: string[]
  VCpuInfo: AwsVCpuInfo
}

export interface AwsImageEbs {
  DeleteOnTermination: boolean
  Encrypted: boolean
  Iops?: any
  KmsKeyId?: any
  SnapshotId: string
  VolumeSize: number
  VolumeType: string
}

export interface AwsImageBlockDeviceMapping {
  DeviceName: string
  Ebs: AwsImageEbs
  NoDevice?: any
  VirtualName: string
}

export interface AwsImage {
  Architecture: string
  BlockDeviceMappings: AwsImageBlockDeviceMapping[]
  CreationDate: Date
  Description: string
  EnaSupport: boolean
  Hypervisor: string
  ImageId: string
  ImageLocation: string
  ImageOwnerAlias: string
  ImageType: string
  KernelId?: any
  Name: string
  OwnerId: string
  Platform: string
  PlatformDetails: string
  ProductCodes?: any
  Public: boolean
  RamdiskId?: any
  RootDeviceName: string
  RootDeviceType: string
  SriovNetSupport: string
  State: string
  StateReason?: any
  Tags?: any
  UsageOperation: string
  VirtualizationType: string
}

export interface AwsInstance {
  AmiLaunchIndex: number
  Architecture: string
  BlockDeviceMappings: AwsBlockDeviceMapping[]
  CapacityReservationId?: any
  CapacityReservationSpecification: AwsCapacityReservationSpecification
  ClientToken: string
  CpuOptions: AwsCpuOptions
  EbsOptimized: boolean
  ElasticGpuAssociations?: any
  ElasticInferenceAcceleratorAssociations?: any
  EnaSupport: boolean
  HibernationOptions: AwsHibernationOptions
  Hypervisor: string
  IamInstanceProfile?: any
  ImageId: string
  InstanceId: string
  InstanceLifecycle?: any
  InstanceType: string
  KernelId?: any
  KeyName: string
  LaunchTime: Date
  Licenses?: any
  MetadataOptions: AwsMetadataOptions
  Monitoring: AwsMonitoring
  NetworkInterfaces: AwsNetworkInterface[]
  OutpostArn?: any
  Placement: AwsPlacement
  Platform?: any
  PrivateDnsName: string
  PrivateIpAddress: string
  ProductCodes?: any
  PublicDnsName?: string
  PublicIpAddress?: any
  RamdiskId?: any
  RootDeviceName: string
  RootDeviceType: string
  SecurityGroups?: AwsSecurityGroup[]
  SourceDestCheck: boolean
  SpotInstanceRequestId?: any
  SriovNetSupport?: any
  State: AwsState
  StateReason: AwsStateReason
  StateTransitionReason: string
  SubnetId: string
  Tags?: AwsTag[]
  VirtualizationType: string
  VpcId: string
}

export interface AwsAZ {
  GroupName: string
  Messages?: any
  NetworkBorderGroup: string
  OptInStatus: string
  RegionName: string
  State: string
  ZoneId: string
  ZoneName: string
}

export interface AwsReservation {
  Groups?: any
  Instances: AwsInstance[]
  OwnerId: string
  RequesterId?: any
  ReservationId: string
}

export interface AwsVolumeAttachment {
  AttachTime: Date
  DeleteOnTermination: boolean
  Device: string
  InstanceId: string
  State: string
  VolumeId: string
}

export type AwsVolumeState = 'creating' | 'available' | 'in-use' | 'deleting' | 'deleted' | 'error'

export interface AwsVolume {
  Attachments: AwsVolumeAttachment[]
  AvailabilityZone: string
  CreateTime: Date
  Encrypted: boolean
  FastRestored?: any
  Iops: number
  KmsKeyId?: any
  MultiAttachEnabled: boolean
  OutpostArn?: any
  Size: number
  SnapshotId: string
  State: AwsVolumeState
  Tags?: AwsTag[]
  VolumeId: string
  VolumeType: string
}

export interface AwsHostedZoneConfig {
  Comment: string
  PrivateZone: boolean
}

export interface AwsHostedZone {
  CallerReference: string
  Config: AwsHostedZoneConfig
  Id: string
  LinkedService?: any
  Name: string
  ResourceRecordSetCount: number
}

export interface AwsHostedZoneDelegationSet {
  CallerReference?: any
  Id?: any
  NameServers: string[]
}

export interface AwsHostedZoneDetail {
  DelegationSet: AwsHostedZoneDelegationSet
  HostedZone: AwsHostedZone
  VPCs?: any
}

export interface AwsLimit2 {
  Type: string
  Value: number
}

export interface AwsLimit {
  Count: number
  Limit: AwsLimit2
}

export interface AwsAliasTarget {
  DNSName: string
  EvaluateTargetHealth: boolean
  HostedZoneId: string
}

export interface AwsResourceRecord {
  Value: string
}

export interface AwsResourceRecordSet {
  AliasTarget: AwsAliasTarget
  Failover?: any
  GeoLocation?: any
  HealthCheckId?: any
  MultiValueAnswer?: any
  Name: string
  Region?: any
  ResourceRecords: AwsResourceRecord[]
  SetIdentifier?: any
  TTL?: number
  TrafficPolicyInstanceId?: any
  Type: string
  Weight?: any
}

export interface AwsRecordSets {
  IsTruncated: boolean
  MaxItems: string
  NextRecordIdentifier?: any
  NextRecordName?: any
  NextRecordType?: any
  ResourceRecordSets: AwsResourceRecordSet[]
}

export interface AwsHealthCheckConfig {
  AlarmIdentifier?: any
  ChildHealthChecks?: any
  Disabled: boolean
  EnableSNI: boolean
  FailureThreshold: number
  FullyQualifiedDomainName: string
  HealthThreshold?: any
  IPAddress?: any
  InsufficientDataHealthStatus?: any
  Inverted: boolean
  MeasureLatency: boolean
  Port: number
  Regions?: any
  RequestInterval: number
  ResourcePath?: any
  SearchString: string
  Type: string
}

export interface AwsHealthCheck {
  CallerReference: string
  CloudWatchAlarmConfiguration?: any
  HealthCheckConfig: AwsHealthCheckConfig
  HealthCheckVersion: number
  Id: string
  LinkedService?: any
  Tags: AwsTag[]
}

export interface AwsHealthCheckDetail {
  CallerReference: string
  CloudWatchAlarmConfiguration?: any
  HealthCheckConfig: AwsHealthCheckConfig
  HealthCheckVersion: number
  Id: string
  LinkedService?: any
}

export interface AwsHealthStatusReport {
  CheckedTime: Date
  Status: string
}

export interface AwsHealthCheckObservation {
  IPAddress: string
  Region: string
  StatusReport: AwsHealthStatusReport
}

export interface AwsHealthCheckStatus {
  HealthCheckObservations: AwsHealthCheckObservation[]
}

export interface AwsHealthCheckMonitorUnit {
  Average: number
  ExtendedStatistics?: any
  Maximum: number
  Minimum: number
  SampleCount: number
  Sum: number
  Timestamp: Date
  Unit: string
}

export interface AwsCostResult {
  IsForecast: boolean
  Estimated: boolean
  Groups: AwsCostGroup[]
  TimePeriod: AwsCostTimePeriod
  Total: AwsCostMetrics
}

export interface AwsCostTimePeriod {
  End: string
  Start: string
}

export interface AwsCostGroup {
  Keys: string[]
  Metrics: AwsCostMetrics
}

export interface AwsCostMetrics {
  [x: string]: AwsCostMerticObject
}

export interface AwsCostMerticObject {
  Amount: string
  Unit: string
}

export interface AwsCostForecastResult {
  ForecastResultsByTime: AwsCostForecastResultsByTime[]
  Total: AwsCostMerticObject
}

export interface AwsCostForecastResultsByTime {
  MeanValue: string
  PredictionIntervalLowerBound?: any
  PredictionIntervalUpperBound?: any
  TimePeriod: AwsCostTimePeriod
}

export interface AwsBillingAlarm {
  ActionsEnabled: boolean
  AlarmActions: string[]
  AlarmArn: string
  AlarmConfigurationUpdatedTimestamp: Date
  AlarmDescription: string
  AlarmName: string
  ComparisonOperator: string
  DatapointsToAlarm?: any
  Dimensions?: any
  EvaluateLowSampleCountPercentile?: any
  EvaluationPeriods: number
  ExtendedStatistic?: any
  InsufficientDataActions?: any
  MetricName: string
  Metrics?: any
  Namespace: string
  OKActions?: any
  Period: number
  StateReason: string
  StateReasonData?: any
  StateUpdatedTimestamp: Date
  StateValue: string
  Statistic: string
  Threshold: number
  ThresholdMetricId?: any
  TreatMissingData?: any
  Unit?: any
}

export interface AwsSNSTopic {
  TopicArn: string
}
// #endregion

// #region [Project]
export interface ProjectReservedQuota {
  cpu: number
  external_ip: number
  instance: number
  keypair: number
  ram: number
  security_group: number
  snapshot: number
  volume: number
  volume_size: number
}
export interface Project {
  is_domain: boolean
  description: string
  domain_id: string
  enabled: boolean
  id: string
  name: string
  parent_id: string
  tags?: any[]
  compute_quota?: ComputeQuotaSet
  volume_quota?: VolumeQuotaSet
  reserved_quota?: ProjectReservedQuota
}
// #endregion

// #region [QuotaSet]
export interface QuotaSetFixedIps {
  in_use: number
  reserved: number
  limit: number
}

export interface QuotaSetFloatingIps {
  in_use: number
  reserved: number
  limit: number
}

export interface QuotaSetInjectedFileContentBytes {
  in_use: number
  reserved: number
  limit: number
}

export interface QuotaSetInjectedFilePathBytes {
  in_use: number
  reserved: number
  limit: number
}

export interface QuotaSetInjectedFiles {
  in_use: number
  reserved: number
  limit: number
}

export interface QuotaSetKeyPairs {
  in_use: number
  reserved: number
  limit: number
}

export interface QuotaSetMetadataItems {
  in_use: number
  reserved: number
  limit: number
}

export interface QuotaSetRam {
  in_use: number
  reserved: number
  limit: number
}

export interface QuotaSetSecurityGroupRules {
  in_use: number
  reserved: number
  limit: number
}

export interface QuotaSetSecurityGroups {
  in_use: number
  reserved: number
  limit: number
}

export interface QuotaSetCores {
  in_use: number
  reserved: number
  limit: number
}

export interface QuotaSetInstances {
  in_use: number
  reserved: number
  limit: number
}

export interface QuotaSetServerGroups {
  in_use: number
  reserved: number
  limit: number
}

export interface QuotaSetServerGroupMembers {
  in_use: number
  reserved: number
  limit: number
}

export interface ComputeQuotaSet {
  id: string
  fixed_ips: QuotaSetFixedIps
  floating_ips: QuotaSetFloatingIps
  injected_file_content_bytes: QuotaSetInjectedFileContentBytes
  injected_file_path_bytes: QuotaSetInjectedFilePathBytes
  injected_files: QuotaSetInjectedFiles
  key_pairs: QuotaSetKeyPairs
  metadata_items: QuotaSetMetadataItems
  ram: QuotaSetRam
  security_group_rules: QuotaSetSecurityGroupRules
  security_groups: QuotaSetSecurityGroups
  cores: QuotaSetCores
  instances: QuotaSetInstances
  server_groups: QuotaSetServerGroups
  server_group_members: QuotaSetServerGroupMembers
}

export interface QuotaSetVolumes {
  in_use: number
  allocated: number
  reserved: number
  limit: number
}

export interface QuotaSetSnapshots {
  in_use: number
  allocated: number
  reserved: number
  limit: number
}

export interface QuotaSetGigabytes {
  in_use: number
  allocated: number
  reserved: number
  limit: number
}

export interface QuotaSetPerVolumeGigabytes {
  in_use: number
  allocated: number
  reserved: number
  limit: number
}

export interface QuotaSetBackups {
  in_use: number
  allocated: number
  reserved: number
  limit: number
}

export interface QuotaSetBackupGigabytes {
  in_use: number
  allocated: number
  reserved: number
  limit: number
}

export interface QuotaSetGroups {
  in_use: number
  allocated: number
  reserved: number
  limit: number
}

export interface VolumeQuotaSet {
  id: string
  volumes: QuotaSetVolumes
  snapshots: QuotaSetSnapshots
  gigabytes: QuotaSetGigabytes
  per_volume_gigabytes: QuotaSetPerVolumeGigabytes
  backups: QuotaSetBackups
  backup_gigabytes: QuotaSetBackupGigabytes
  groups: QuotaSetGroups
}

export interface QuotaSetResponse {
  compute: ComputeQuotaSet
  storage: VolumeQuotaSet
}
// #endregion

// #region [Hyperrvisor]
export interface HypervisorTotal {
  count: number
  current_workload: number
  disk_available_least: number
  free_disk_gb: number
  free_ram_mb: number
  local_gb: number
  local_gb_used: number
  memory_mb: number
  memory_mb_used: number
  running_vms: number
  vcpus: number
  vcpus_used: number
}

export interface HypervisorService {
  host: string
  disabled_reason: string
}

export interface Hypervisor {
  current_workload: number
  status: string
  state: string
  disk_available_least: number
  host_ip: string
  free_disk_gb: number
  free_ram_mb: number
  hypervisor_hostname: string
  hypervisor_type: string
  id: string
  local_gb: number
  local_gb_used: number
  memory_mb: number
  memory_mb_used: number
  running_vms: number
  service: HypervisorService
  vcpus: number
  vcpus_used: number
}
// #endregion

// #region [Action log]
export type CloudProvider = 'AWS' | 'OPENSTACK'

export type LogService =
  | 'User'
  | 'Network'
  | 'KeyPair'
  | 'Router'
  | 'Instance'
  | 'Image'
  | 'Volume'
  | 'Snapshot'
  | 'Security Group'
  | 'Load balancer'
  | 'Floating IP'
  | 'System'
  | 'Role'
  | 'Credentials'
  | 'EC2'
  | 'Project'
  | 'Permission'

export interface ActionLog {
  id: number
  created_at: Date
  updated_at: Date
  os_user_id: string
  cloud_provider?: CloudProvider
  service: LogService
  resource_name: string
  resource_id: string
  event_name: string
  event_date: string
  error_msg: string
  source_ip: string
  os_tenant_id: string
  os_tenant_name: string
  email: string
  request_body: string
  request_header: string
}
// #endregion

// #region [Filemanager]
export interface FileOwner {
  name: string
  id: string
}

export interface FileInterface {
  etag: string
  name: string
  lastModified: Date
  size: number
  contentType: string
  expires: Date
  metadata?: any
  userMetadata?: any
  userTags?: any
  showName: string
  extension: string
  UserTagCount: number
  Owner: FileOwner
  Grant?: any
  storageClass: string
  IsLatest: boolean
  IsDeleteMarker: boolean
  VersionID: string
  ReplicationStatus: string
  Expiration: Date
  ExpirationRuleID: string
}

export type FilemanagerViewType = 'grid' | 'list'

export interface SelectedBucket {
  name: string
  isCloud: boolean
}

export interface Bucket {
  name: string
  creationDate: Date
}

export type BucketType = 'onpremise' | 'cloud' | 'first_cloud'

export interface CloudBucketAvailableForUpload {
  n: number
  peta: number
}

export interface CloudBucketFree {
  n: number
  peta: number
}

export interface CloudBucketData {
  available_for_upload: CloudBucketAvailableForUpload
  free: CloudBucketFree
  last_update: number
  size: number
  size_reduced: number
}

export interface CloudBucketNumObjects {
  last_update: number
  value: number
}

export interface CloudBucketOwnerAccount {
  email: string
  id: string
}

export interface CloudBucketPolicyModes {
  quota_status: string
  resiliency_status: string
}

export interface CloudBucketState {
  css: 'success' | 'error' | 'warning' | 'processing'
  tooltip: string
}

export interface CloudBucketStats {
  last_read: number
  last_write: number
  reads: number
  writes: number
}

export interface CloudBucketStatsByType {
  count: number
  data_type: string
  reads: number
  size: number
  writes: number
}

export interface CloudBucketFree2 {
  n: number
  peta: number
}

export interface CloudBucketTotal {
  n: number
  peta: number
}

export interface CloudBucketValues {
  free: CloudBucketFree2
  total: CloudBucketTotal
  used: number
  used_other: number
}

export interface CloudBucketStorage {
  last_update: number
  values: CloudBucketValues
}

export interface CloudBucketFree3 {
  n: number
  peta: number
}

export interface CloudBucketData2 {
  free: CloudBucketFree3
}

export interface CloudBucketFree4 {
  n: number
  peta: number
}

export interface CloudBucketTotal2 {
  n: number
  peta: number
}

export interface CloudBucketUnavailableFree {
  n: number
  peta: number
}

export interface CloudBucketStorage2 {
  free: CloudBucketFree4
  reserved: number
  total: CloudBucketTotal2
  unavailable_free: CloudBucketUnavailableFree
  unavailable_used: number
  used: number
  used_other: number
}

export interface CloudBucketTier {
  disabled: boolean
  mode: string
  order: number
  spillover: boolean
  tier: string
}

export interface CloudBucketTiering {
  data: CloudBucketData2
  mode: string
  name: string
  storage: CloudBucketStorage2
  tiers: CloudBucketTier[]
}

export interface CloudBucketStorage3 {
  blocks_size: number
}

export interface CloudBucketPool {
  pool_name: string
  storage: CloudBucketStorage3
}

export interface CloudBucketUsageByPool {
  last_update: number
  pools: CloudBucketPool[]
}

export interface CloudBucket {
  bucket_type: string
  data: CloudBucketData
  host_tolerance: number
  mode: string
  name: string
  node_tolerance: number
  num_objects: CloudBucketNumObjects
  owner_account: CloudBucketOwnerAccount
  policy_modes: CloudBucketPolicyModes
  state: CloudBucketState
  stats: CloudBucketStats
  stats_by_type: CloudBucketStatsByType[]
  storage: Storage
  tag: string
  tiering: CloudBucketTiering
  triggers: any[]
  usage_by_pool: CloudBucketUsageByPool
  versioning: string
  writable: boolean
}

export interface CloudConnection {
  auth_method: string
  endpoint: string
  endpoint_type: string
  identity: string
  name: string
  usage: any[]
}

export interface CloudResourceCloudInfo {
  auth_method: string
  created_by: string
  endpoint: string
  endpoint_type: string
  target_bucket: string
}

export interface CloudResourceDataActivities {
  activities: any[]
  host_count: number
}

export interface CloudResourceIoStats {
  read_bytes: number
  read_count: number
  write_bytes: number
  write_count: number
}

export interface CloudResourceTotal {
  n: number
  peta: number
}

export interface CloudResourceUnavailableFree {
  n: number
  peta: number
}

export interface CloudResourceStorage {
  free: number
  reserved: number
  total: CloudResourceTotal
  unavailable_free: CloudResourceUnavailableFree
  unavailable_used: number
  used: number
  used_other: number
}

export interface CloudResourceState {
  css: 'success' | 'error' | 'warning'
  name: string
  tooltip: string
}

export interface CloudResource {
  associated_accounts: any[]
  cloud_info: CloudResourceCloudInfo
  create_time: number
  data_activities: CloudResourceDataActivities
  io_stats: CloudResourceIoStats
  is_managed: boolean
  mode: string
  name: string
  state: CloudResourceState
  pool_node_type: string
  resource_type: string
  storage: CloudResourceStorage
  undeletable: string
}

export interface CloudObjectPartChunkCoderConfig {
  cipher_type: string
  compress_type: string
  data_frags: number
  digest_type: string
  frag_digest_type: string
  parity_frags: number
  replicas: number
}

export interface CloudObjectPartAdminfo {
  host_name: string
  in_cloud_pool: boolean
  in_mongo_pool: boolean
  mirror_group: string
  mount: string
  node_ip: string
  node_name: string
  online: boolean
  pool_name: string
}

export interface CloudObjectPartBlockMd {
  address: string
  digest_b64: string
  digest_type: string
  id: string
  is_preallocated: boolean
  node: string
  node_type: string
  pool: string
  size: number
}

export interface CloudObjectPartBlock {
  adminfo: CloudObjectPartAdminfo
  block_md: CloudObjectPartBlockMd
  is_accessible: boolean
  is_deletion: boolean
  is_future_deletion: boolean
}

export interface CloudObjectPartFrag {
  _id: string
  allocations: any[]
  blocks: CloudObjectPartBlock[]
  data_index: number
  digest_b64: string
}

export interface CloudObjectPartPart {
  chunk_id: string
  end: number
  obj_id: string
  seq: number
  start: number
}

export interface CloudObjectPartChunk {
  _id: string
  key: number
  bucket_id: string
  chunk_coder_config: CloudObjectPartChunkCoderConfig
  cipher_key_b64: string
  compress_size: number
  digest_b64: string
  frag_size: number
  frags: CloudObjectPartFrag[]
  is_accessible: boolean
  is_building_blocks: boolean
  is_building_frags: boolean
  parts: CloudObjectPartPart[]
  size: number
  tier_id: string
}

export interface CloudObjectPartStats {
  last_read: number
  reads: number
}

export interface CloudObjectPartXattr {}

export interface CloudObjectPartObjectMd {
  bucket: string
  content_type: string
  create_time: number
  etag: string
  is_latest: boolean
  key: string
  md5_b64: string
  num_parts: number
  obj_id: string
  size: number
  stats: CloudObjectPartStats
  tag_count: number
  version_id: string
  xattr: CloudObjectPartXattr
}

export interface CloudObjectPart {
  chunks: CloudObjectPartChunk[]
  object_md: CloudObjectPartObjectMd
}
// #endregion

// #region [K8s]
// #region [Namespace]
export interface K8sNSManagedField {
  manager: string
  operation: string
  apiVersion: string
  time: Date
  fieldsType: string
  fieldsV1: any
}

export interface K8sNSSpec {
  finalizers: string[]
}

export type K8sNSStatusPhase = 'Active' | 'Terminating'

export interface K8sNSStatus {
  phase: K8sNSStatusPhase
}

export interface K8sNamespace {
  metadata: K8sMetadata
  spec: K8sNSSpec
  status: K8sNSStatus
}
// #endregion

// #region [Docker HUB]
export interface DockerHubImage {
  id: string
  name: string
  slug: string
  type: string
  publisher: any
  created_at: Date
  updated_at: Date
  short_description: string
  source: string
  popularity: number
  categories: any[]
  operating_systems: any[]
  architectures: any[]
  logo_url: any
  certification_status: string
  star_count: number
  filter_type: string
}
export interface DockerHubTag {
  id: number
  name: string
  last_updated: Date
  full_size: number
}
// #endregion

// #region [Deployment]
export interface K8sDPManagedField {
  manager: string
  operation: string
  apiVersion: string
  time: Date
  fieldsType: string
  fieldsV1: any
}

export interface K8sMetadata {
  name: string
  namespace: string
  selfLink: string
  uid: string
  resourceVersion: string
  generation: number
  creationTimestamp: Date
  annotations: any
  labels: StringInterface
  managedFields: K8sDPManagedField[]
}

export interface K8sDPMatchLabels {
  app: string
  author: string
}

export interface K8sDPSelector {
  matchLabels: K8sDPMatchLabels
}

export interface K8sDPMetadata2 {
  creationTimestamp?: any
  labels: StringInterface
}

export interface K8sDPPort {
  name: string
  containerPort: number
  protocol: string
}

export interface K8sDPEnv {
  name: string
  value: string
}

export interface K8sDPResources {}

export interface K8sDPContainer {
  name: string
  image: string
  ports: K8sDPPort[]
  env: K8sDPEnv[]
  command?: string[]
  resources: K8sDPResources
  terminationMessagePath: string
  terminationMessagePolicy: string
  imagePullPolicy: string
}

export interface K8sDPSecurityContext {}

export interface K8sDPSpec2 {
  containers: K8sDPContainer[]
  restartPolicy: string
  terminationGracePeriodSeconds: number
  dnsPolicy: string
  securityContext: K8sDPSecurityContext
  schedulerName: string
}

export interface K8sDPTemplate {
  metadata: K8sDPMetadata2
  spec: K8sDPSpec2
}

export interface K8sDPRollingUpdate {
  maxUnavailable: string
  maxSurge: string
}

export interface K8sDPStrategy {
  type: string
  rollingUpdate: K8sDPRollingUpdate
}

export interface K8sDPSpec {
  replicas: number
  selector: K8sDPSelector
  template: K8sDPTemplate
  strategy: K8sDPStrategy
  revisionHistoryLimit: number
  progressDeadlineSeconds: number
}

export interface K8sDPCondition {
  type: string
  status: string
  lastUpdateTime: Date
  lastTransitionTime: Date
  reason: string
  message: string
}

export interface K8sDPStatus {
  observedGeneration: number
  replicas: number
  updatedReplicas: number
  readyReplicas: number
  availableReplicas?: number
  unavailableReplicas?: number
  conditions: K8sDPCondition[]
}

export interface K8sDeployment {
  metadata: K8sMetadata
  spec: K8sDPSpec
  status: K8sDPStatus
}
// #endregion

// #region [Service]
export interface K8sSRManagedField {
  manager: string
  operation: string
  apiVersion: string
  time: Date
  fieldsType: string
  fieldsV1: any
}

export interface K8sSRPort {
  name: string
  protocol: string
  port: number
  targetPort: number
  nodePort?: number
}

export interface K8sSRSelector {
  app: string
}

export interface K8sSRSpec {
  ports: K8sSRPort[]
  clusterIP: string
  type: string
  selector?: K8sSRSelector
  sessionAffinity: string
}

export interface K8sSRLoadBalancer {}

export interface K8sSRStatus {
  loadBalancer: K8sSRLoadBalancer
}

export interface K8sService {
  metadata: K8sMetadata
  spec: K8sSRSpec
  status: K8sSRStatus
}
// #endregion

// #region [Pod]
export interface K8sPodSpec {
  volumes: {
    name: string
    secret: {
      secretName: string
      defaultMode: number
    }
  }[]
  containers: {
    name: string
    image: string
    ports: {
      name: string
      containerPort: number
      protocol: string
    }[]
    env: {
      name: string
      value: string
    }[]
    resources: any
    volumeMounts: {
      name: string
      readOnly: boolean
      mountPath: string
    }[]
    terminationMessagePath: string
    terminationMessagePolicy: string
    imagePullPolicy: string
  }[]
  restartPolicy: string
  terminationGracePeriodSeconds: number
  dnsPolicy: string
  serviceAccountName: string
  serviceAccount: string
  nodeName: string
  securityContext: any
  schedulerName: string
  tolerations: {
    key: string
    operator: string
    effect: string
    tolerationSeconds: number
  }[]
  priority: number
  enableServiceLinks: boolean
  preemptionPolicy: string
}

export interface K8sPodContainerStatus {
  name: string
  state: {
    running: {
      startedAt: Date
    }
  }
  lastState: any
  ready: boolean
  restartCount: number
  image: string
  imageID: string
  containerID: string
  started: boolean
}

export type K8sPodStatusPhase = 'Pending' | 'Running' | 'Succeeded' | 'Failed' | 'Unknown'

export interface K8sPodStatus {
  phase: K8sPodStatusPhase
  conditions: {
    type: string
    status: string
    lastProbeTime?: any
    lastTransitionTime: Date
  }[]
  hostIP: string
  podIP: string
  podIPs: {
    ip: string
  }[]
  startTime: Date
  containerStatuses: K8sPodContainerStatus[]
  qosClass: string
}

export interface K8sPod {
  metadata: K8sMetadata
  spec: K8sPodSpec
  status: K8sPodStatus
}
// #endregion

// #region [Storage class]
export interface K8sStorageClass {
  metadata: K8sMetadata
  provisioner: string
  reclaimPolicy: string
  volumeBindingMode: string
  parameters?: StringInterface
}
// #endregion

// #region [Persistent volume]
export interface K8sPVRequests {
  storage: string
}

export interface K8sPVResources {
  requests: K8sPVCRequests
}

export interface K8sPVSpec {
  accessModes: string[]
  resources: K8sPVCResources
  storageClassName: string
  volumeMode: string
}

export type K8sPVStatusPhase = 'Pending' | 'Bound' | 'Lost'

export interface K8sPVStatus {
  phase: K8sPVCStatusPhase
}

export interface K8sPersistentVolume {
  metadata: K8sMetadata
  spec: K8sPVCSpec
  status: K8sPVCStatus
}
// #endregion

// #region [Persistent volume claim]
export interface K8sPVCRequests {
  storage: string
}

export interface K8sPVCResources {
  requests: K8sPVCRequests
}

export interface K8sPVCSpec {
  accessModes: string[]
  resources: K8sPVCResources
  storageClassName: string
  volumeMode: string
}

export type K8sPVCStatusPhase = 'Pending' | 'Bound' | 'Lost'

export interface K8sPVCStatus {
  phase: K8sPVCStatusPhase
}

export interface K8sPersistentVolumeClaim {
  metadata: K8sMetadata
  spec: K8sPVCSpec
  status: K8sPVCStatus
}
// #endregion
// #endregion
