var hello2 = function(name) {
    var message = "Hello, " + name
    return message
}

function toBoolean (data) {
    return data.toLowerCase() === 'true';
}


var getAllMembers = function(data)
{
    var entries = [];

    data.values.forEach(function(value){

        var entry = {
            index:null,
            name_en:null,
            name_jp:null,
            country:null,
            role:null,
            is_core:null,
            affiliaton_en:null,
            affiliaton_jp:null,
            position_en:null,
            position_jp:null,
            photo:null,
            url:null,
        };

        // コメント行の読み飛ばし
        if (value[0].startsWith('#')) return;
        else if(value[0].toLowerCase()!='true') return;

        var idx = 0;
        entry.index = value[++idx];
        entry.name_en = value[++idx];
        entry.name_jp = value[++idx];
        if(entry.name_jp == "")
        {
            entry.name_jp = entry.name_en;
        }
        entry.country = value[++idx];
        entry.role = value[++idx];
        entry.is_core = toBoolean(value[++idx]);
        entry.affiliaton_en = value[++idx];
        entry.affiliaton_jp = value[++idx];
        entry.position_en = value[++idx];
        entry.position_jp = value[++idx];
        entry.photo = value[++idx];
        entry.url = value[++idx];

        entries.push(entry);


    });

    // 氏名でソート
    entries.sort(function (a, b) {
        if (a.name_en > b.name_en) return 1;
        if (a.name_en < b.name_en) return -1;
        return 0;
    });


    return entries;
}

var extractMembersByCountry = function(data, country_name)
{
    var entries = getAllMembers(data);
    members = [];

    entries.forEach(function(value){
        if(value.country === country_name) {
            members.push(value);
        }
    });

    return members;

}

var extractMembersByRole = function(data){

    var entries = getAllMembers(data);

    coordinator = [];
    sub_coordinators = [];
    foreign_coordinators = [];
    core_members = [];
    members = [];

    entries.forEach(function(value){
        if(value.role === "コーディネーター") {
            coordinator.push(value);
        }
        else if(value.role ==="副コーディネーター") {
            sub_coordinators.push(value);
        }
        else if(value.role　==="相手国のコーディネーター") {
            foreign_coordinators.push(value);
        }
        else if(value.role ==="メンバー") {
            if (value.is_core) {
                core_members.push(value);
            }
            else {
                members.push(value);
            }
        }
    });

    return[coordinator, sub_coordinators, foreign_coordinators, core_members, members];

}





var getAllOrganizations = function(data)
{
    var entries = [];
    // 機関名（日本語）	機関名（英語）	機関区分	国名
    data.values.forEach(function(value){

        var entry = {
            name_jp:null,
            name_en:null,
            type:null,
            country:null,
            url:null
        };

        // コメント行の読み飛ばし
        if (value[0].startsWith('#')) return;
        else if(value[0].toLowerCase()!='true') return;

        var idx = 0;
        entry.name_jp = value[++idx]
        entry.name_en = value[++idx]
        entry.type = value[++idx]
        entry.country = value[++idx]
        entry.url = value[++idx]

        entries.push(entry)

    });

    return entries;
}

var getBaseOrganizationByCountry = function(data, country_name)
{
    var entries = getAllOrganizations(data);

    base_organizations = [];

    entries.forEach(function(value){
        if(value.type === "拠点機関" && value.country === country_name) {
            base_organizations.push(value);
        }
    });

    return base_organizations;
}

var getCooperateOrganizationsByCountry = function(data, country_name)
{
    var entries = getAllOrganizations(data);

    cooperate_organizations = [];

    entries.forEach(function(value){
        if(value.type === "協力機関" && value.country === country_name) {
            cooperate_organizations.push(value);
        }
    });

    return cooperate_organizations;
}
var getYYYYmmdd = function(date)
{
    return String(date.getFullYear())+ "/"
        + String(date.getMonth()+1)+"/"+String(date.getDate());
}