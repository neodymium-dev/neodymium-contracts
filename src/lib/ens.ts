
export const
    ENSResolver: string = "ENSResolver",
    Resolver: string = "Resolver",
    AddressResolver: string = "AddressResolver",
    NameResolver: string = "NameResolver",
    ENSDiamondInit: string = "DiamondInit";

export const
    ResolverFacet: string = Resolver + "Facet",
    AddressResolverFacet: string = AddressResolver + "Facet",
    NameResolverFacet: string = NameResolver + "Facet",
    UtilsFacet: string = "UtilsFacet";

export const ENSDiamondFacets = {
    ResolverFacet:        "ResolverFacet",
    AddressResolverFacet: "AddressResolverFacet",
    NameResolverFacet:    "NameResolverFacet",
    UtilsFacet:           "UtilsFacet",
};

export const ENSArtifactPaths = {
    ENSResolver: "contracts/ens/ENSResolver.sol:ENSResolver",
    Resolver: "contracts/ens/resolvers/Resolver.sol:Resolver",
    AddressResolver: "contracts/ens/resolvers/AddressResolver.sol:AddressResolver",
    NameResolver: "contracts/ens/resolvers/NameResolver.sol:NameResolver",
};

const
    contractDiamondPath: string = "contracts/ens/diamond",
    facetsPath:          string = contractDiamondPath + "/facets";

const facetPath = (f: string): string => `${facetsPath}/${f}.sol:${f}`;

export const ENSDiamondArtifactPaths = {
    ResolverFacet:        facetPath(ResolverFacet),
    AddressResolverFacet: facetPath(AddressResolverFacet),
    NameResolverFacet:    facetPath(NameResolverFacet),
    UtilsFacet:           facetPath(UtilsFacet),
    ENSDiamondInit:       contractDiamondPath + "/initializer/DiamondInit.sol:DiamondInit",
};