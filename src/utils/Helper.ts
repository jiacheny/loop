class Group {

  name: string;
  parent: string = "";
  users: string[] = [];

  constructor(public groupName: string) {
    this.name = groupName;
  }

  toGroupInfoMap(indentation: number) {
    return {
      type: "g",
      key: this.parent + this.name,
      name: this.name,
      indentation: indentation
    }
  }

  toUsersInfoMap(indentation: number) {
    let map: any[] = [];
    for (let i in this.users) {
      let u = this.users[i];
      map.push({
        type: "u",
        key: this.name + u,
        name: u,
        indentation: indentation
      })
    }
    return map;
  }

}

export function drawGraph(isMemberOfGraph: any) {

  let groups: Group[] = [];

  for (let i in isMemberOfGraph) {
    const pair = isMemberOfGraph[i];
    addGroup(groups, pair.from, pair.to);
  }

  let graphData: any[] = [];
  let indentation = 0;
  let topLevelGroups = groups.filter(g => g.parent === "");
  for (let i in topLevelGroups) {
    draw(graphData, groups, topLevelGroups[i], indentation);
  }

  return graphData;
}

function drawChild(graphData: any[], groups: Group[], parentKey: string, indentation: number) {
  let childGroups = groups.filter(g => g.parent === parentKey);
  for (let i in childGroups) {
    draw(graphData, groups, childGroups[i], indentation);
  }
}

function draw(graphData: any[], groups: Group[], g: Group, indentation: number) {
  graphData.push(g.toGroupInfoMap(indentation));
  drawChild(graphData, groups, g.name, indentation+1);
  graphData.push(...g.toUsersInfoMap(indentation+1));
}

function addGroup(groups: Group[], from: string, to: string) {

  let parent: Group | undefined;
  if (hasGroup(groups, to)) {
    parent = getGroup(groups, to);
  } else {
    parent = new Group(to);
    groups.push(parent);
  }

  if (isGroup(from)) {
    let child: Group | undefined;
    if (hasGroup(groups, from)) {
      child = getGroup(groups, from);
    } else {
      child = new Group(from);
      groups.push(child);
    }
    if (typeof child !== "undefined") {
      child.parent = to;
    }
  }

  if (typeof parent !== "undefined") {
    if (isUser(from)) {
      parent.users.push(from);
    }
  }

}

function hasGroup(groups: Group[], groupName: string): boolean {
  for (let g of groups) {
    if (g.name === groupName)
      return true;
  }
  return false;
}

function getGroup(groups: Group[], groupName: string): Group | undefined {
  for (let g of groups) {
    if (g.name === groupName)
      return g;
  }
  return undefined;
}

function isGroup (key: string): boolean {
  return key.startsWith("g");
}

function isUser(key: string): boolean {
  return key.startsWith("u");
}

export function randomKey(type: string) {
  let key = "";
  let id = Math.round(Math.random() * 100);
  if (type === 'group') {
    key = "g" + id;
  } else if (type === "user") {
    key = "u" + id;
  }
  return key;
}