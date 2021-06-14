interface FilterItem {
    [key:string]:{$in:string[]};
  }
interface Filter {
    $or?:FilterItem[];
}
