import Basic from './basic.json'
import Dashboard from './dashboard.json'
import Instance from './instance.json'
import Keypair from './keypair.json'
import SecurityGroup from './security_group.json'
import LoadBalancer from './load_balancer.json'
import Snapshot from './snapshot.json'
import Valid from './valid.json'
import Volume from './volume.json'
import Menu from './menu.json'
import Project from './project.json'
import User from './user.json'
import Image from './image.json'
import Network from './network.json'
import Router from './router.json'
import System from './system.json'
import Role from './role.json'
import Permission from './permission.json'
import Credential from './credential.json'
import FloatingIP from './floating_ip.json'
import ObjectStorage from './object_storage.json'
import Route53 from './route_53.json'
import Billing from './billing.json'
import Monitor from './monitor.json'
import K8s from './k8s.json'

export default {
  ...Basic,
  ...Dashboard,
  ...Instance,
  ...Keypair,
  ...Volume,
  ...Snapshot,
  ...Valid,
  ...LoadBalancer,
  ...SecurityGroup,
  ...Menu,
  ...Project,
  ...User,
  ...Image,
  ...Network,
  ...Router,
  ...System,
  ...Role,
  ...Permission,
  ...Credential,
  ...FloatingIP,
  ...ObjectStorage,
  ...Route53,
  ...Billing,
  ...Monitor,
  ...K8s,
}
